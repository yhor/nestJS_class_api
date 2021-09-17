# 학교뉴스피드

Node.js, TypeScript, NestJS, DynamoDB, Lambda + SAM

## API 문서

https://hpj4mrb1nh.execute-api.ap-northeast-2.amazonaws.com/Prod/swagger


## dynamoDB 설계

### 학교테이블
```
    - 지역(area) string
    - 학교명(name) string
    - 뉴스 (news) string[]
        - cid (cid) number
        - 제목(subject) string
        - 내용 (content) string
        - 생성일(reg_date) Date
        - 수정일(update_date) Date
        - 삭제여부(is_delete) string
```

### 유저테이블
    유저는 이름이 중복안된다는 전재하에 진행된다
```
    - 이름(name) string
    - 등급(grade) string
    - 구독(subs) String[]
        - 지역(area) string
        - 학교명(name)  string
        - 구독 시작(sub_start_date) Date
        - 구독 끝(sub_end_date) Date
        - 구독중(is_sub) string
```
