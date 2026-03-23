export interface PlatformProduct {
    타이틀: string;
    설명: string;
    주요고객군: string;
    핵심가치: { 타이틀: string; 설명: string }[];
    주요기능: string[];
    주요특징이미지: {
        타이틀: string;
        설명: string;
        이미지URL: string;
    }[];
    특장점: { 타이틀: string; 설명: string }[];
    주요활용시나리오: {
        타이틀: string;
        설명?: string;
        항목?: { 중타이틀: string; 설명: string }[];
    }[];
    고객사례: any[];
    소개영상: {
        타이틀: string;
        URL: string;
    }[];
    오퍼링: {
        타이틀: string;
        설명: string;
        상세링크?: string;
    }[];
    제품상세문의: {
        이메일: string;
        전화번호: string;
    };
    관련리소스: {
        타이틀: string;
        파일타입: string;
        URL: string;
    }[];
    메인이미지?: string;
    노출뉴스?: {
        타이틀: string;
        날짜: string;
        링크: string;
    }[];
    다운로드?: {
        타이틀: string;
        파일타입: string;
        URL: string;
    }[];
}
