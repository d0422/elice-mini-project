# 미니 프로젝트 과제 설명

### 커밋 컨벤션

1. feature : 새로운 기능 추가
2. refactor : 코드 리팩토링
3. chore : 기타 수정 사항
4. fix : 버그 수정
5. docs : 문서 수정
6. test : 테스트 코드 관련
7. config : 프로젝트 세팅 / 빌드 부분 혹은 패키지 매니저 수정사항

### Task

- [x] 프로젝트 setting
- [x] 페이지 Layout 구성
- [x] SearchArea 구성
  - [x] UI구성
  - [x] 300ms 디바운스 처리
  - [x] 검색 시 params변경/새로고침시 params 복구
- [x] Filter 구성
  - [x] Chip 컴포넌트 구성
  - [x] Chip 요소 상수분리 (무료/유료/선택타입)
  - [x] Chip컴포넌트 action 구현 (params 추가)
- [x] Middleware API(API routes) 구성
  - [x] 필요한 타입만 필터링하여 응답처리
  - [x] API 연동 처리
- [x] Body 구성
  - [x] Label 구성
  - [x] Description 구성
  - [x] IconText구성
  - [x] Logo구성
- [x] Pagination 구성

# 문제 해결 방식

## 핵심 아이디어

핵심아이디어는 router.query를 기반으로 한 api요청입니다.
검색/필터의 상태가 새로고침이 되었을때도 모두 유지되어야 했기때문에 이러한 방식을 택했습니다.

따라서 따로 전역상태와 같은 상태관리 라이브러리를 택하지 않았습니다.
router.query라는 브라우저 URL상태가 이미 존재했기 때문입니다.

### useQueryParams

NextRouter의 router.query를 반복해서 사용하다보니 key, value가 계속해서 헷갈리는 문제가 있었습니다.
이러한 문제를 해결하기 위해 useQueryParams로 NextRouter 메서드를 한번 래핑하여, key-value 타입을 명확하게 선언하여 사용하기 좋게 개선하였습니다.

add같은 경우를 예시로 들면

1. query내부의 객체를 조작
2. router.push

하는 두가지 과정을 거쳐야했습니다.
useQueryParams의 반환객체 내부의 add함수는 이 과정을 " 특정 키값에 value를 추가한다 "의 형태로 추상화합니다.
따라서 개발자는 add(key,value)의 형태로 간단하게 query상태를 조작할 수 있게 됩니다.

그리고 router.query의 반환값이 string,string[],undefined일 수 있는 문제가 있었는데 이 역시 로직을 추상화하여 routerQueryString util함수를 만들어주었습니다.
useQueryParams 내부적으로 해당 util함수를 사용하게 하였습니다.

## hooks

### useDebounce

300ms의 Debounce처리를 hook의 형태로 모듈화해주었습니다.
주요 로직이 컴포넌트에 있기보다는 hook으로 존재할때, 가독성도 높아지고, 테스트도 가능해지기때문에 hook의형태로 분리하였습니다.

지정한 시간 이후에 넘겨준 콜백함수가 수행됩니다.

### useInput

useInput은 기본적으로 비제어 컴포넌트인 input을 제어컴포넌트로 변경하기 위해서 만든 훅입니다. 검색어를 state로 관리하고, state를 통해 서버로 요청을 보내기 위해서였습니다.

여기서 그저 내부 state를 변경하기보다는 변경할때, 추가적인 행동을 해주면 디바운스 검색 처리도 더 용이해질 수 있을거라 판단하여 additionalChange를 optional의 형태로 받을 수 있게 구현하였습니다.

## API Routes

CORS문제를 해결하고자 API Routes를 구성해주었습니다.
로컬 개발 환경(localhost:3000)과 서버(api-rest.elice.io)는 다른 origin입니다. 따라서 Cross Origin간의 Resource Sharing에 해당합니다.

이 경우 서버의 Access-Control-Allow-Origin 헤더를 설정해주어야 공유가 가능하나, 이것이 불가하므로 API Routes라는 선택지를 택하게되었습니다.

클라이언트에서 전송한 req.query를 그대로 구조 분해 할당하여 전송하게 만들었고, 서버 응답중 필요한 것들만 뽑아서 필터링해주었습니다.

이때 필요한 키를 COURSE_OBJECT_KEYS라는 상수로 처리하여 이후에 필요한
키가 바뀌는 경우에 대처하기 쉽게 구성하였습니다.

## Filter & Chips

기본적으로 문제 요구사항에는 무료, 유료, 무료+유료형태로 price라는 한가지 타입의 Chips만 기재되어있으나 엘리스의 실제 사이트에서는 여러가지 타입의 Chips를 확인할 수 있었습니다.

따라서 확장성을 고려하여 설계하였습니다.

```typescript
export const CHIPS: Record<ChipType, Record<ChipValue, ChipInformation>> = {
  price: {
    //querString타입
    free: {
      value: 'free', //querString에 들어갈 value
      title: '무료', //사용자의 화면에 보일 Chip 제목
      params: {
        //API에 들어갈 params
        is_free: true,
        enroll_type: 0,
      },
    },
    paid: {
      value: 'paid',
      title: '유료',
      params: {
        is_free: false,
        enroll_type: 0,
      },
    },
  },
};
```

현재는 price와 내부의 free, paid밖에 없지만, price외에 다른 값들을 추가할때, 타입과 객체만 추가해주면 컴포넌트 로직부는 건드리지 않아도 추가할 수 있게 구현하였습니다.

Chip 컴포넌트는 Chip의 type과 해당 type의 value값이 있으면 눌렀을때 ?type=value형태로 queryString을 추가해주는 컴포넌트입니다.
Filter컴포넌트에서 ChipType에 따른 배열을 얻고, 그 배열을 map을 통해 렌더링하는 형태로 구현해주었습니다.

```typescript
export default function Filter() {
  const PRICE_CHIPS_ARRAY = Object.values(CHIPS.price); //price Chips입니다.
  return (
    <Wrapper>
      {PRICE_CHIPS_ARRAY.map((chip) => (
        <Chip key={chip.value} type="price" value={chip.value} />
      ))}
    </Wrapper>
  );
}
```

### API요청시 Chips의 queryString얻어오기

만들어둔 상수 CHIPS를 Array형태로 변환시킨 CHIPS_ARRAY를 순회하면서 해당 Chip의 params(is_free,enroll_type객체)를 얻어 요청 params에 담아주었습니다.

## Pagination

### useCoursePage

api폴더에 useCoursePage훅을 만들어 구현하였습니다.
page정보를 통해 데이터를 받아오고, 현재 페이지 상태를 특정 페이지로 변경하는 함수, 현재 페이지, 전체 페이지 수를 관리합니다.

router.query가 바뀌게 되면, 검색어/필터값이 바뀐 것이므로 page를 초기상태로 돌려주었고, 아닌 경우, 현재 page상태에 맞게 요청을 보내어 데이터를 갱신시켜주었습니다.

해당 훅에서 반환한 데이터를 바탕으로 body렌더링과 page데이터 렌더링을 구현하였습니다.

### Pages

getRenderPageArray를 통해 화면에 보일 PageNumberArray를 얻어왔고, 이를 통해 현재 페이지에서 4개 이전/이후의 페이지만 화면에 보일 수 있도록 처리하였습니다.
