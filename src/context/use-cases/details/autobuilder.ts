export const AUTOBUILDER_DETAIL = {
    title: "Cloud TR(Auto Builder) 엔지니어링 솔루션 적용 사례",
    subtitle: "Cloud TR(Auto Builder) 엔지니어링 솔루션 적용 사례",
    header: "대규모 레거시 전환 공수 절감과 Cloud 전환 경쟁력 강화를 동시에 실현하다",
    sections: [
        {
            id: "background",
            title: "1. 고객사 소개 및 배경",
            content: "국내 통신·ICT 분야에서 수백 개 이상의 업무 시스템을 운영하는 B기업은 노후화된 Java·Spring 기반 시스템을 Cloud 환경에 맞게 현대화해야 하는 대규모 Mass Migration 프로젝트를 추진하고 있었다. 그러나 기존 전환 방식은 다음과 같은 문제를 갖고 있었다.",
            list: [
                "수작업 중심 전환 방식의 비효율: 기존 JDK/Spring 버전 상향, 라이브러리 교체, DB 전환(SQL 변환) 업무가 개발자 분석 → 수정 → 검증의 반복 작업으로 진행됨",
                "전환 규칙의 표준화 부재: 프로젝트마다 Spring/Java 전환 규칙이 달라 품질 편차가 컸음",
                "전환 리드타임 장기화: 평균 수백 개의 소스 파일을 단계별로 검토해야 해서 전환 기간이 길어짐"
            ],
            footer: "이에 B기업은 전환 자동화 비율을 획기적으로 높이고, Mass Migration MP3(경쟁입찰) 사업에서 원가 경쟁력을 확보하기 위해 Cloud TR 엔지니어링 솔루션(Auto Builder)을 도입했다."
        },
        {
            id: "objective",
            title: "2. 도입 목표",
            list: [
                "1. 전환 자동화율 30% 이상 확보: Spring Boot 3.x, JDK 17, Azure PostgreSQL 기반의 최신 구조로 자동 변환",
                "2. 전환 품질 안정성 확보: OpenRewrite 기반 Rule(Recipe)과 LLM 기반 반복 패턴 Prompt를 고도화",
                "3. 전환 리드타임 단축 → 사업 경쟁력 강화: KT Mass TR MP3차(경쟁) 사업 대응을 위한 전환 Ref. 확보"
            ]
        },
        {
            id: "solution",
            title: "3. 솔루션: Cloud TR 엔지니어링 솔루션 구조",
            content: "Cloud TR 엔지니어링 솔루션(Auto Builder)은 OpenRewrite + LLM 기반 Prompt 엔진을 결합해 다음과 같은 구조로 제공된다.",
            items: [
                {
                    타이틀: "전환 소스 분석",
                    설명: "AS-IS 소스(JDK 7~11 / Spring Boot 1.x~2.x / EDB PAS·MariaDB)를 자동 분석하여 전환 대상과 영향도를 추출"
                },
                {
                    타이틀: "OpenRewrite Rule(Recipe) 기반 코드 전환",
                    설명: "버전 상향, Deprecated API 치환, 라이브러리 변경 등을 Rule 기반으로 자동 적용"
                },
                {
                    타이틀: "반복 패턴 기반 LLM Prompt 전환",
                    설명: "규칙 기반으로 처리하기 어려운 전환(비정형 SQL, Custom Logic 등)을 LLM 패턴 학습 기반으로 자동 변환"
                },
                {
                    타이틀: "DBMS SQL 전환",
                    설명: "EDB→PostgreSQL, MariaDB→Azure MySQL 전환 규칙 자동 적용"
                },
                {
                    타이틀: "통합 검증 & 실행로그 제공",
                    설명: "전환 성공/실패 여부, 단계별 소요시간, 전환율을 자동 기록"
                }
            ]
        },
        {
            id: "process",
            title: "4. 구축 과정",
            items: [
                {
                    타이틀: "전환 Rule/Prompt 고도화",
                    설명: "기존 레거시 소스를 수집해 전환 패턴 학습. OpenRewrite Rule 및 반복 패턴 기반 LLM Prompt 고도화"
                },
                {
                    타이틀: "Tool Chain 기반 자동 전환 프로세스 구축",
                    설명: "Auto Builder 웹 UI 기반 전환 흐름 정의. 분석 → Rule 전환 → LLM 전환 → 빌드 검증까지 자동화"
                },
                {
                    타이틀: "SQL 전환 및 DB 마이그레이션 테스트",
                    설명: "DB 전환 규칙 검증. 주요 서비스 대상 전환 PoC 및 전환율 측정"
                },
                {
                    타이틀: "적용 절차 정립",
                    설명: "실제 MP3차 경쟁 사업 적용을 위한 전환 프로세스 표준화. 수작업 필요 여부 판단 로직, 공수 절감 분석 체계 마련"
                }
            ]
        },
        {
            id: "results",
            title: "5. 도입 효과",
            items: [
                {
                    타이틀: "전환율 100% 검증 (파일 기준)",
                    설명: "AGIES, GiGA Office 등 실제 단위 서비스 테스트 결과 전환 대상 전체 100% 자동 전환 성공"
                },
                {
                    타이틀: "전환 공수 48% 절감",
                    설명: "Java 기반 App 전환 MM 64 → 31 MM (-48%). 전체 MM 기준 28% 절감"
                },
                {
                    타이틀: "전환 리드타임 단축",
                    설명: "자동 Rule + LLM 조합으로 수작업 검토 시간을 대폭 절감. 단계별 소요시간 분석 기능을 통해 지연 구간 즉시 파악"
                },
                {
                    타이틀: "Cloud 전환 경쟁력 강화",
                    설명: "MP3차(경쟁입찰) 사업 대응용 전환 Reference 확보. Java·Python 등 추가 언어로 Coverage 확장 가능"
                }
            ]
        },
        {
            id: "comment",
            title: "6. 고객 담당자 코멘트(가상 인터뷰)",
            quotes: [
                {
                    text: "Cloud TR 엔지니어링 솔루션 덕분에 전환 품질과 속도가 모두 개선됐습니다. 특히 Spring·JDK 버전 업그레이드와 DB 전환을 자동으로 처리하면서 개발자 검토 부담이 크게 줄었습니다. 대규모 MP3 사업에서도 경쟁력을 확보할 수 있게 되어 매우 만족하고 있습니다.",
                    author: "B기업 Cloud 전환 PM"
                }
            ]
        },
        {
            id: "future",
            title: "7. 향후 계획",
            list: [
                "Python, Node.js 등 전환 Coverage 확대",
                "전환 자동화 Rule 지속 고도화",
                "보안성 검토 및 취약점 진단 체계 강화 SaaS / On-prem 버전 동시 개발 및 기능 확장 (Private LLM, Code Analyzer, Devis Lucato 테스트 자동화 등)"
            ]
        }
    ]
};
