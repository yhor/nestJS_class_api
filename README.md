# 학교뉴스피드

Node.js, TypeScript, NestJS, DynamoDB, Lambda + SAM

## API 문서

https://class.yeol.tech/swagger

## API 사용법

1. 인프라
    - aws cli && aws sam 설치
    - sam build && sam delpoy --guided ( samconfig.toml 생성)
2. API 사용
     
---
- ### 사전준비 유저생성, JWT 토큰 발급
    - POST(/user) - 유저( 학생 or 관리자를 생성) 생성

        ```
        curl --request POST \
        --url http://localhost:3000/user \
        --header 'Content-Type: application/json' \
        --data '{
            "name": "승열",
            "role": "학생"
        }'
        ```
    - POST(/login) - jwt 토큰 생성
        ```
       curl --request POST \
        --url 'http://localhost:3000/login?name=%EC%8A%B9%EC%97%B4&role=%ED%95%99%EC%83%9D' \
        --header 'Content-Type: application/json' \
        --data '{ "name": "승열", "role": "관리자" }'
        ```

---
- ### _학교 관리자는 학교를 페이지를 운영하여 학교 소식을 발행할 수 있다._
    -  POST(/school) - 학교 관리자는 지역, 학교명으로 학교 페이지를 생성할 수 있다.
        ```
       curl --request POST \
        --url http://localhost:3000/school \
        --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi7Iq57Je0Iiwicm9sZSI6Iuq0gOumrOyekCIsImlhdCI6MTYzMTk4OTUyMiwiZXhwIjoxNjMxOTkzMTIyfQ._oka6UWwucEYOqgj5WrOhg5N16iQOzMFsmh_soxbDq0' \
        --header 'Content-Type: application/json' \
        --data '{
            "area": "서울",
            "name": "포항공대"
        }'
        ```
    - POST(/school/news) -  학교 관리자는 학교 페이지 내에 소식을 작성할 수 있다.
        ```
        curl --request POST \
        --url http://localhost:3000/school/news \
        --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi7Iq57Je0Iiwicm9sZSI6Iuq0gOumrOyekCIsImlhdCI6MTYzMjA4MDk4MiwiZXhwIjoxNjMyMDg0NTgyfQ.5WPAWND6qMYeEs8dKFlftVglTRtfBHIS57vSLEBBRB0' \
        --header 'Content-Type: application/json' \
        --data '{
            "area": "서울",
            "name": "포항공대",
            "news": {
                "subject": "속보",
                "content": "즐거운 명절 보내세요"
            }
        }'
        ```
    - DELETE(/school/news/{id}/{학교명}/{지역}) -  학교 관리자는 작성된 소식을 삭제할 수 있다.
        ```
        curl --request DELETE \
        --url 'http://localhost:3000/school/news/1/%EC%84%9C%EA%B0%95%EB%8C%80/%EC%84%9C%EC%9A%B8?area=%EC%84%9C%EC%9A%B8&name=%EC%84%9C%EA%B0%95%EB%8C%80' \
        --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi7Iq57Je0Iiwicm9sZSI6Iuq0gOumrOyekCIsImlhdCI6MTYzMjI0MDA0MywiZXhwIjoxNjMyMjQzNjQzfQ.Hw_OOdG3riXv3aIg1Ek-TbfVsRYKuldtlcXVulD2aMM'
        ```
    - PATCH(/school/news/{id}) - 학교 관리자는 작성된 소식을 수정할 수 있다.

        ```
        curl --request PATCH \
        --url http://localhost:3000/school/news/1 \
        --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi7Iq57Je0Iiwicm9sZSI6Iuq0gOumrOyekCIsImlhdCI6MTYzMjI0MDA0MywiZXhwIjoxNjMyMjQzNjQzfQ.Hw_OOdG3riXv3aIg1Ek-TbfVsRYKuldtlcXVulD2aMM' \
        --header 'Content-Type: application/json' \
        --data '{
            "area": "서울",
            "name": "포항공대",
            "news": {
                "id": 1,
                "subject": "속보",
                "content": "즐거운 가을되세요"
            }
        }'
        ```
---
- ### _학생은 학교 페이지를 구독하여 학교 소식을 받아 볼 수 있다._
    - POST(/user/sub) - 학생은 학교 페이지를 구독할 수 있다.
        ```
        curl --request POST \
        --url 'http://localhost:3000/user/sub?name=yeol&grade=a' \
        --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi7Iq57Je0Iiwicm9sZSI6Iu2VmeyDnSIsImlhdCI6MTYzMjI0MDUwMiwiZXhwIjoxNjMyMjQ0MTAyfQ.K9vW5wXc2hTyQbxgxPdl9Y7f1wK3Orsw6-cjvsA34go' \
        --header 'Content-Type: application/json' \
        --data '{
            "area": "서울",
            "name": "포항공대"
        }'
        ```
    - GET(/user/sub/list) - 학생은 구독 중인 학교 페이지 목록을 확인할 수 있다.
        ```
        curl --request GET \
        --url http://localhost:3000/user/sub/list \
        --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi7Iq57Je0Iiwicm9sZSI6Iu2VmeyDnSIsImlhdCI6MTYzMjI0MDUwMiwiZXhwIjoxNjMyMjQ0MTAyfQ.K9vW5wXc2hTyQbxgxPdl9Y7f1wK3Orsw6-cjvsA34go'
        ```
    - PATCH(/user/sub) - 학생은 구독 중인 학교 페이지를 구독 취소할 수 있다.
        ```
        curl --request PATCH \
        --url 'http://localhost:3000/user/sub?name=&area=a' \
        --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi7Iq57Je0Iiwicm9sZSI6Iu2VmeyDnSIsImlhdCI6MTYzMjI0MDUwMiwiZXhwIjoxNjMyMjQ0MTAyfQ.K9vW5wXc2hTyQbxgxPdl9Y7f1wK3Orsw6-cjvsA34go' \
        --header 'Content-Type: application/json' \
        --data '{
            "area": "서울",
            "name": "포항공대"
        }'
        ```
    - GET(/user/sub) - 학생은 구독 중인 학교 페이지별 소식을 볼 수 있다. 학교별 소식은 최신순으로 노출해야 함
        ```
        curl --request GET \
        --url 'http://localhost:3000/user/sub/%ED%8F%AC%ED%95%AD%EA%B3%B5%EB%8C%80/%EC%84%9C%EC%9A%B8?name=%EC%8A%B9%EC%97%B4&grade=%ED%95%99%EC%83%9D' \
        --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi7Iq57Je0Iiwicm9sZSI6Iu2VmeyDnSIsImlhdCI6MTYzMjI0MDUwMiwiZXhwIjoxNjMyMjQ0MTAyfQ.K9vW5wXc2hTyQbxgxPdl9Y7f1wK3Orsw6-cjvsA34go'
        ```

- ### 추가구현
    - GET(/user/sub/all) - 구독중인 모든 학교의 소식을 모아볼 수 있어야 함
        ```
        curl --request GET \
        --url http://localhost:3000/user/sub/all \
        --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi7Iq57Je0Iiwicm9sZSI6Iu2VmeyDnSIsImlhdCI6MTYzMjI0MDUwMiwiZXhwIjoxNjMyMjQ0MTAyfQ.K9vW5wXc2hTyQbxgxPdl9Y7f1wK3Orsw6-cjvsA34go'
        ```


## dynamoDB 설계
### 학교테이블
-  지역(area) string
- 학교명(name) string
- 뉴스 (news) string[]
    - cid (cid) number
    - 제목(subject) string
    - 내용 (content) string
    - 생성일(reg_date) Date
    - 수정일(update_date) Date
    - 삭제여부(is_delete) string
### 유저테이블 (유저는 이름이 중복안된다는 전재하에 진행된다)
- 이름(name) string
- 권한(role) string
- 구독(subs) String[]
    - 지역(area) string
    - 학교명(name)  string
    - 구독 시작(sub_start_date) Date
    - 구독 끝(sub_end_date) Date
    - 구독중(is_sub) string