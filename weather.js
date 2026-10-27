/**
 * SkyPulse Weather Application
 * Live weather monitoring, hourly & 7-day forecast using Open-Meteo API
 */

(function () {
  'use strict';

  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // 1. Curated National & Global Cities Database
  // -------------------------------------------------------------
  const MAJOR_CITIES_DICT = {};

  const KOREAN_REGIONS = [
    // 전북특별자치도
    { n: '익산', full: '익산시', p: '전북특별자치도', lat: 35.9483, lon: 126.9576, rom: 'iksan' },
    { n: '전주', full: '전주시', p: '전북특별자치도', lat: 35.8242, lon: 127.1480, rom: 'jeonju' },
    { n: '군산', full: '군산시', p: '전북특별자치도', lat: 35.9676, lon: 126.7366, rom: 'gunsan' },
    { n: '정읍', full: '정읍시', p: '전북특별자치도', lat: 35.5699, lon: 126.8577, rom: 'jeongeup' },
    { n: '남원', full: '남원시', p: '전북특별자치도', lat: 35.4164, lon: 127.3905, rom: 'namwon' },
    { n: '김제', full: '김제시', p: '전북특별자치도', lat: 35.8036, lon: 126.8809, rom: 'gimje' },
    { n: '완주', full: '완주군', p: '전북특별자치도', lat: 35.9048, lon: 127.1624, rom: 'wanju' },
    { n: '진안', full: '진안군', p: '전북특별자치도', lat: 35.7925, lon: 127.4250, rom: 'jinan' },
    { n: '무주', full: '무주군', p: '전북특별자치도', lat: 36.0069, lon: 127.6606, rom: 'muju' },
    { n: '장수', full: '장수군', p: '전북특별자치도', lat: 35.6472, lon: 127.5217, rom: 'jangsu' },
    { n: '임실', full: '임실군', p: '전북특별자치도', lat: 35.6178, lon: 127.2889, rom: 'imsil' },
    { n: '순창', full: '순창군', p: '전북특별자치도', lat: 35.3744, lon: 127.1375, rom: 'sunchang' },
    { n: '고창', full: '고창군', p: '전북특별자치도', lat: 35.4358, lon: 126.7021, rom: 'gochang' },
    { n: '부안', full: '부안군', p: '전북특별자치도', lat: 35.7317, lon: 126.7333, rom: 'buan' },

    // 전라남도
    { n: '목포', full: '목포시', p: '전라남도', lat: 34.8118, lon: 126.3922, rom: 'mokpo' },
    { n: '여수', full: '여수시', p: '전라남도', lat: 34.7604, lon: 127.6622, rom: 'yeosu' },
    { n: '순천', full: '순천시', p: '전라남도', lat: 34.9506, lon: 127.4872, rom: 'suncheon' },
    { n: '나주', full: '나주시', p: '전라남도', lat: 35.0161, lon: 126.7108, rom: 'naju' },
    { n: '광양', full: '광양시', p: '전라남도', lat: 34.9407, lon: 127.6959, rom: 'gwangyang' },
    { n: '담양', full: '담양군', p: '전라남도', lat: 35.3211, lon: 126.9882, rom: 'damyang' },
    { n: '곡성', full: '곡성군', p: '전라남도', lat: 35.2820, lon: 127.2919, rom: 'gokseong' },
    { n: '구례', full: '구례군', p: '전라남도', lat: 35.2025, lon: 127.4627, rom: 'gurye' },
    { n: '고흥', full: '고흥군', p: '전라남도', lat: 34.6111, lon: 127.2855, rom: 'goheung' },
    { n: '보성', full: '보성군', p: '전라남도', lat: 34.7714, lon: 127.0799, rom: 'boseong' },
    { n: '화순', full: '화순군', p: '전라남도', lat: 35.0645, lon: 126.9867, rom: 'hwasun' },
    { n: '장흥', full: '장흥군', p: '전라남도', lat: 34.6817, lon: 126.9071, rom: 'jangheung' },
    { n: '강진', full: '강진군', p: '전라남도', lat: 34.6421, lon: 126.7672, rom: 'gangjin' },
    { n: '해남', full: '해남군', p: '전라남도', lat: 34.5735, lon: 126.5991, rom: 'haenam' },
    { n: '영암', full: '영암군', p: '전라남도', lat: 34.8001, lon: 126.6968, rom: 'yeongam' },
    { n: '무안', full: '무안군', p: '전라남도', lat: 34.9904, lon: 126.4817, rom: 'muan' },
    { n: '함평', full: '함평군', p: '전라남도', lat: 35.0657, lon: 126.5165, rom: 'hampyeong' },
    { n: '영광', full: '영광군', p: '전라남도', lat: 35.2773, lon: 126.5121, rom: 'yeonggwang' },
    { n: '장성', full: '장성군', p: '전라남도', lat: 35.3015, lon: 126.7848, rom: 'jangseong' },
    { n: '완도', full: '완도군', p: '전라남도', lat: 34.3110, lon: 126.7550, rom: 'wando' },
    { n: '진도', full: '진도군', p: '전라남도', lat: 34.4868, lon: 126.2634, rom: 'jindo' },
    { n: '신안', full: '신안군', p: '전라남도', lat: 34.8336, lon: 126.3516, rom: 'sinan' },

    // 서울특별시
    { n: '서울', full: '서울특별시', p: '수도권', lat: 37.5665, lon: 126.9780, rom: 'seoul' },
    { n: '강남', full: '서울 강남구', p: '서울특별시', lat: 37.5172, lon: 127.0473, rom: 'gangnam' },
    { n: '서초', full: '서울 서초구', p: '서울특별시', lat: 37.4837, lon: 127.0324, rom: 'seocho' },
    { n: '송파', full: '서울 송파구', p: '서울특별시', lat: 37.5145, lon: 127.1066, rom: 'songpa' },
    { n: '강동', full: '서울 강동구', p: '서울특별시', lat: 37.5301, lon: 127.1238, rom: 'gangdong' },
    { n: '마포', full: '서울 마포구', p: '서울특별시', lat: 37.5663, lon: 126.9016, rom: 'mapo' },
    { n: '영등포', full: '서울 영등포구', p: '서울특별시', lat: 37.5264, lon: 126.8962, rom: 'yeongdeungpo' },
    { n: '용산', full: '서울 용산구', p: '서울특별시', lat: 37.5326, lon: 126.9904, rom: 'yongsan' },
    { n: '성동', full: '서울 성동구', p: '서울특별시', lat: 37.5634, lon: 127.0368, rom: 'seongdong' },
    { n: '광진', full: '서울 광진구', p: '서울특별시', lat: 37.5385, lon: 127.0823, rom: 'gwangjin' },
    { n: '동대문', full: '서울 동대문구', p: '서울특별시', lat: 37.5744, lon: 127.0400, rom: 'dongdaemun' },
    { n: '중랑', full: '서울 중랑구', p: '서울특별시', lat: 37.6066, lon: 127.0927, rom: 'jungnang' },
    { n: '성북', full: '서울 성북구', p: '서울특별시', lat: 37.5891, lon: 127.0182, rom: 'seongbuk' },
    { n: '강북', full: '서울 강북구', p: '서울특별시', lat: 37.6396, lon: 127.0255, rom: 'gangbuk' },
    { n: '도봉', full: '서울 도봉구', p: '서울특별시', lat: 37.6688, lon: 127.0471, rom: 'dobong' },
    { n: '노원', full: '서울 노원구', p: '서울특별시', lat: 37.6542, lon: 127.0568, rom: 'nowon' },
    { n: '은평', full: '서울 은평구', p: '서울특별시', lat: 37.6027, lon: 126.9291, rom: 'eunpyeong' },
    { n: '서대문', full: '서울 서대문구', p: '서울특별시', lat: 37.5791, lon: 126.9368, rom: 'seodaemun' },
    { n: '종로', full: '서울 종로구', p: '서울특별시', lat: 37.5730, lon: 126.9794, rom: 'jongno' },
    { n: '양천', full: '서울 양천구', p: '서울특별시', lat: 37.5170, lon: 126.8665, rom: 'yangcheon' },
    { n: '강서', full: '서울 강서구', p: '서울특별시', lat: 37.5509, lon: 126.8495, rom: 'gangseo' },
    { n: '구로', full: '서울 구로구', p: '서울특별시', lat: 37.4954, lon: 126.8874, rom: 'guro' },
    { n: '금천', full: '서울 금천구', p: '서울특별시', lat: 37.4568, lon: 126.8954, rom: 'geumcheon' },
    { n: '동작', full: '서울 동작구', p: '서울특별시', lat: 37.5124, lon: 126.9393, rom: 'dongjak' },
    { n: '관악', full: '서울 관악구', p: '서울특별시', lat: 37.4784, lon: 126.9516, rom: 'gwanak' },
    { n: '여의도', full: '서울 여의도', p: '서울특별시', lat: 37.5215, lon: 126.9242, rom: 'yeouido' },
    { n: '잠실', full: '서울 잠실', p: '서울특별시', lat: 37.5133, lon: 127.1001, rom: 'jamsil' },
    { n: '홍대', full: '서울 홍대입구', p: '서울특별시', lat: 37.5575, lon: 126.9245, rom: 'hongdae' },
    { n: '신촌', full: '서울 신촌', p: '서울특별시', lat: 37.5598, lon: 126.9423, rom: 'sinchon' },

    // 경기도
    { n: '수원', full: '수원시', p: '경기도', lat: 37.2636, lon: 127.0286, rom: 'suwon' },
    { n: '성남', full: '성남시', p: '경기도', lat: 37.4200, lon: 127.1265, rom: 'seongnam' },
    { n: '분당', full: '성남시 분당구', p: '경기도', lat: 37.3827, lon: 127.1189, rom: 'bundang' },
    { n: '판교', full: '성남시 판교', p: '경기도', lat: 37.3948, lon: 127.1114, rom: 'pangyo' },
    { n: '고양', full: '고양시', p: '경기도', lat: 37.6584, lon: 126.8320, rom: 'goyang' },
    { n: '일산', full: '고양시 일산', p: '경기도', lat: 37.6896, lon: 126.7712, rom: 'ilsan' },
    { n: '용인', full: '용인시', p: '경기도', lat: 37.2411, lon: 127.1776, rom: 'yongin' },
    { n: '수지', full: '용인시 수지구', p: '경기도', lat: 37.3223, lon: 127.0975, rom: 'suji' },
    { n: '부천', full: '부천시', p: '경기도', lat: 37.5034, lon: 126.7660, rom: 'bucheon' },
    { n: '안산', full: '안산시', p: '경기도', lat: 37.3219, lon: 126.8309, rom: 'ansan' },
    { n: '안양', full: '안양시', p: '경기도', lat: 37.3943, lon: 126.9568, rom: 'anyang' },
    { n: '남양주', full: '남양주시', p: '경기도', lat: 37.6360, lon: 127.2165, rom: 'namyangju' },
    { n: '화성', full: '화성시', p: '경기도', lat: 37.1995, lon: 126.8315, rom: 'hwaseong' },
    { n: '동탄', full: '화성시 동탄', p: '경기도', lat: 37.2005, lon: 127.0878, rom: 'dongtan' },
    { n: '평택', full: '평택시', p: '경기도', lat: 36.9921, lon: 127.1129, rom: 'pyeongtaek' },
    { n: '의정부', full: '의정부시', p: '경기도', lat: 37.7381, lon: 127.0337, rom: 'uijeongbu' },
    { n: '시흥', full: '시흥시', p: '경기도', lat: 37.3802, lon: 126.8029, rom: 'siheung' },
    { n: '파주', full: '파주시', p: '경기도', lat: 37.7599, lon: 126.7801, rom: 'paju' },
    { n: '김포', full: '김포시', p: '경기도', lat: 37.6153, lon: 126.7156, rom: 'gimpo' },
    { n: '광명', full: '광명시', p: '경기도', lat: 37.4786, lon: 126.8647, rom: 'gwangmyeong' },
    { n: '군포', full: '군포시', p: '경기도', lat: 37.3616, lon: 126.9352, rom: 'gunpo' },
    { n: '이천', full: '이천시', p: '경기도', lat: 37.2723, lon: 127.4350, rom: 'icheon' },
    { n: '오산', full: '오산시', p: '경기도', lat: 37.1498, lon: 127.0772, rom: 'osan' },
    { n: '하남', full: '하남시', p: '경기도', lat: 37.5393, lon: 127.2148, rom: 'hanam' },
    { n: '양주', full: '양주시', p: '경기도', lat: 37.7853, lon: 127.0458, rom: 'yangju' },
    { n: '구리', full: '구리시', p: '경기도', lat: 37.5943, lon: 127.1296, rom: 'guri' },
    { n: '안성', full: '안성시', p: '경기도', lat: 37.0080, lon: 127.2798, rom: 'anseong' },
    { n: '포천', full: '포천시', p: '경기도', lat: 37.8949, lon: 127.2003, rom: 'pocheon' },
    { n: '의왕', full: '의왕시', p: '경기도', lat: 37.3448, lon: 126.9683, rom: 'uiwang' },
    { n: '여주', full: '여주시', p: '경기도', lat: 37.2984, lon: 127.6371, rom: 'yeoju' },
    { n: '동두천', full: '동두천시', p: '경기도', lat: 37.9035, lon: 127.0607, rom: 'dongducheon' },
    { n: '과천', full: '과천시', p: '경기도', lat: 37.4292, lon: 126.9877, rom: 'gwacheon' },
    { n: '가평', full: '가평군', p: '경기도', lat: 37.8315, lon: 127.5097, rom: 'gapyeong' },
    { n: '양평', full: '양평군', p: '경기도', lat: 37.4917, lon: 127.4876, rom: 'yangpyeong' },
    { n: '연천', full: '연천군', p: '경기도', lat: 38.0964, lon: 127.0747, rom: 'yeoncheon' },

    // 광역시 및 특별자치시/도
    { n: '인천', full: '인천광역시', p: '수도권', lat: 37.4563, lon: 126.7052, rom: 'incheon' },
    { n: '송도', full: '인천 송도', p: '인천광역시', lat: 37.3894, lon: 126.6543, rom: 'songdo' },
    { n: '부평', full: '인천 부평구', p: '인천광역시', lat: 37.5070, lon: 126.7219, rom: 'bupyeong' },
    { n: '강화', full: '강화군', p: '인천광역시', lat: 37.7464, lon: 126.4880, rom: 'ganghwa' },
    { n: '영종', full: '인천 영종도', p: '인천광역시', lat: 37.4925, lon: 126.4950, rom: 'yeongjong' },
    { n: '부산', full: '부산광역시', p: '영남권', lat: 35.1796, lon: 129.0756, rom: 'busan' },
    { n: '해운대', full: '부산 해운대구', p: '부산광역시', lat: 35.1631, lon: 129.1636, rom: 'haeundae' },
    { n: '광안리', full: '부산 광안리', p: '부산광역시', lat: 35.1532, lon: 129.1186, rom: 'gwanganri' },
    { n: '기장', full: '부산 기장군', p: '부산광역시', lat: 35.2447, lon: 129.2223, rom: 'gijang' },
    { n: '대구', full: '대구광역시', p: '영남권', lat: 35.8714, lon: 128.6014, rom: 'daegu' },
    { n: '수성', full: '대구 수성구', p: '대구광역시', lat: 35.8583, lon: 128.6306, rom: 'suseong' },
    { n: '달서', full: '대구 달서구', p: '대구광역시', lat: 35.8297, lon: 128.5328, rom: 'dalseo' },
    { n: '대전', full: '대전광역시', p: '충청권', lat: 36.3504, lon: 127.3845, rom: 'daejeon' },
    { n: '유성', full: '대전 유성구', p: '대전광역시', lat: 36.3623, lon: 127.3564, rom: 'yuseong' },
    { n: '광주', full: '광주광역시', p: '호남권', lat: 35.1595, lon: 126.8526, rom: 'gwangju' },
    { n: '울산', full: '울산광역시', p: '영남권', lat: 35.5384, lon: 129.3114, rom: 'ulsan' },
    { n: '세종', full: '세종특별자치시', p: '충청권', lat: 36.4800, lon: 127.2890, rom: 'sejong' },
    { n: '제주', full: '제주특별자치도', p: '제주권', lat: 33.4996, lon: 126.5312, rom: 'jeju' },
    { n: '서귀포', full: '서귀포시', p: '제주권', lat: 33.2541, lon: 126.5601, rom: 'seogwipo' },

    // 강원특별자치도
    { n: '춘천', full: '춘천시', p: '강원특별자치도', lat: 37.8813, lon: 127.7298, rom: 'chuncheon' },
    { n: '원주', full: '원주시', p: '강원특별자치도', lat: 37.3422, lon: 127.9202, rom: 'wonju' },
    { n: '강릉', full: '강릉시', p: '강원특별자치도', lat: 37.7519, lon: 128.8761, rom: 'gangneung' },
    { n: '동해', full: '동해시', p: '강원특별자치도', lat: 37.5247, lon: 129.1143, rom: 'donghae' },
    { n: '태백', full: '태백시', p: '강원특별자치도', lat: 37.1641, lon: 128.9856, rom: 'taebaek' },
    { n: '속초', full: '속초시', p: '강원특별자치도', lat: 38.2070, lon: 128.5918, rom: 'sokcho' },
    { n: '삼척', full: '삼척시', p: '강원특별자치도', lat: 37.4499, lon: 129.1652, rom: 'samcheok' },
    { n: '홍천', full: '홍천군', p: '강원특별자치도', lat: 37.6971, lon: 127.8887, rom: 'hongcheon' },
    { n: '횡성', full: '횡성군', p: '강원특별자치도', lat: 37.4918, lon: 127.9850, rom: 'hoengseong' },
    { n: '영월', full: '영월군', p: '강원특별자치도', lat: 37.1838, lon: 128.4619, rom: 'yeongwol' },
    { n: '평창', full: '평창군', p: '강원특별자치도', lat: 37.3705, lon: 128.3902, rom: 'pyeongchang' },
    { n: '정선', full: '정선군', p: '강원특별자치도', lat: 37.3806, lon: 128.6608, rom: 'jeongseon' },
    { n: '철원', full: '철원군', p: '강원특별자치도', lat: 38.1468, lon: 127.3134, rom: 'cheorwon' },
    { n: '화천', full: '화천군', p: '강원특별자치도', lat: 38.1062, lon: 127.7082, rom: 'hwacheon' },
    { n: '양구', full: '양구군', p: '강원특별자치도', lat: 38.1097, lon: 127.9897, rom: 'yanggu' },
    { n: '인제', full: '인제군', p: '강원특별자치도', lat: 38.0697, lon: 128.1704, rom: 'inje' },
    { n: '고성', full: '고성군 (강원)', p: '강원특별자치도', lat: 38.3806, lon: 128.4678, rom: 'goseong' },
    { n: '양양', full: '양양군', p: '강원특별자치도', lat: 38.0754, lon: 128.6189, rom: 'yangyang' },

    // 충청북도
    { n: '청주', full: '청주시', p: '충청북도', lat: 36.6424, lon: 127.4890, rom: 'cheongju' },
    { n: '충주', full: '충주시', p: '충청북도', lat: 36.9910, lon: 127.9260, rom: 'chungju' },
    { n: '제천', full: '제천시', p: '충청북도', lat: 37.1326, lon: 128.1910, rom: 'jecheon' },
    { n: '보은', full: '보은군', p: '충청북도', lat: 36.4894, lon: 127.7337, rom: 'boeun' },
    { n: '옥천', full: '옥천군', p: '충청북도', lat: 36.3064, lon: 127.5714, rom: 'okcheon' },
    { n: '영동', full: '영동군', p: '충청북도', lat: 36.1750, lon: 127.7834, rom: 'yeongdong' },
    { n: '증평', full: '증평군', p: '충청북도', lat: 36.7853, lon: 127.5814, rom: 'jeungpyeong' },
    { n: '진천', full: '진천군', p: '충청북도', lat: 36.8554, lon: 127.4433, rom: 'jincheon' },
    { n: '괴산', full: '괴산군', p: '충청북도', lat: 36.8153, lon: 127.7928, rom: 'goesan' },
    { n: '음성', full: '음성군', p: '충청북도', lat: 36.9338, lon: 127.6908, rom: 'eumseong' },
    { n: '단양', full: '단양군', p: '충청북도', lat: 36.9845, lon: 128.3656, rom: 'danyang' },

    // 충청남도
    { n: '천안', full: '천안시', p: '충청남도', lat: 36.8151, lon: 127.1139, rom: 'cheonan' },
    { n: '공주', full: '공주시', p: '충청남도', lat: 36.4465, lon: 127.1190, rom: 'gongju' },
    { n: '보령', full: '보령시', p: '충청남도', lat: 36.3333, lon: 126.6129, rom: 'boryeong' },
    { n: '아산', full: '아산시', p: '충청남도', lat: 36.7898, lon: 127.0019, rom: 'asan' },
    { n: '서산', full: '서산시', p: '충청남도', lat: 36.7845, lon: 126.4503, rom: 'seosan' },
    { n: '논산', full: '논산시', p: '충청남도', lat: 36.1872, lon: 127.0987, rom: 'nonsan' },
    { n: '계룡', full: '계룡시', p: '충청남도', lat: 36.2746, lon: 127.2486, rom: 'gyeryong' },
    { n: '당진', full: '당진시', p: '충청남도', lat: 36.8898, lon: 126.6459, rom: 'dangjin' },
    { n: '금산', full: '금산군', p: '충청남도', lat: 36.1087, lon: 127.4881, rom: 'geumsan' },
    { n: '부여', full: '부여군', p: '충청남도', lat: 36.2757, lon: 126.9098, rom: 'buyeo' },
    { n: '서천', full: '서천군', p: '충청남도', lat: 36.0803, lon: 126.6917, rom: 'seocheon' },
    { n: '청양', full: '청양군', p: '충청남도', lat: 36.4593, lon: 126.8016, rom: 'cheongyang' },
    { n: '홍성', full: '홍성군', p: '충청남도', lat: 36.6013, lon: 126.6608, rom: 'hongseong' },
    { n: '예산', full: '예산군', p: '충청남도', lat: 36.6775, lon: 126.8452, rom: 'yesan' },
    { n: '태안', full: '태안군', p: '충청남도', lat: 36.7456, lon: 126.2979, rom: 'taean' },

    // 경상북도
    { n: '포항', full: '포항시', p: '경상북도', lat: 36.0190, lon: 129.3435, rom: 'pohang' },
    { n: '경주', full: '경주시', p: '경상북도', lat: 35.8562, lon: 129.2247, rom: 'gyeongju' },
    { n: '김천', full: '김천시', p: '경상북도', lat: 36.1398, lon: 128.1136, rom: 'gimcheon' },
    { n: '안동', full: '안동시', p: '경상북도', lat: 36.5684, lon: 128.7294, rom: 'andong' },
    { n: '구미', full: '구미시', p: '경상북도', lat: 36.1195, lon: 128.3446, rom: 'gumi' },
    { n: '영주', full: '영주시', p: '경상북도', lat: 36.8057, lon: 128.6241, rom: 'yeongju' },
    { n: '영천', full: '영천시', p: '경상북도', lat: 35.9733, lon: 128.9386, rom: 'yeongcheon' },
    { n: '상주', full: '상주시', p: '경상북도', lat: 36.4109, lon: 128.1591, rom: 'sangju' },
    { n: '문경', full: '문경시', p: '경상북도', lat: 36.5938, lon: 128.1868, rom: 'mungyeong' },
    { n: '경산', full: '경산시', p: '경상북도', lat: 35.8251, lon: 128.7414, rom: 'gyeongsan' },
    { n: '의성', full: '의성군', p: '경상북도', lat: 36.3527, lon: 128.6970, rom: 'uiseong' },
    { n: '청송', full: '청송군', p: '경상북도', lat: 36.4363, lon: 129.0573, rom: 'cheongsong' },
    { n: '영양', full: '영양군', p: '경상북도', lat: 36.6667, lon: 129.1124, rom: 'yeongyang' },
    { n: '영덕', full: '영덕군', p: '경상북도', lat: 36.4151, lon: 129.3658, rom: 'yeongdeok' },
    { n: '청도', full: '청도군', p: '경상북도', lat: 35.6475, lon: 128.7341, rom: 'cheongdo' },
    { n: '고령', full: '고령군', p: '경상북도', lat: 35.7260, lon: 128.2632, rom: 'goryeong' },
    { n: '성주', full: '성주군', p: '경상북도', lat: 35.9193, lon: 128.2831, rom: 'seongju' },
    { n: '칠곡', full: '칠곡군', p: '경상북도', lat: 35.9957, lon: 128.4017, rom: 'chilgok' },
    { n: '예천', full: '예천군', p: '경상북도', lat: 36.6573, lon: 128.4528, rom: 'yecheon' },
    { n: '봉화', full: '봉화군', p: '경상북도', lat: 36.8931, lon: 128.7326, rom: 'bonghwa' },
    { n: '울진', full: '울진군', p: '경상북도', lat: 36.9931, lon: 129.4005, rom: 'uljin' },
    { n: '울릉', full: '울릉군', p: '경상북도', lat: 37.4845, lon: 130.9056, rom: 'ulleung' },
    { n: '독도', full: '독도', p: '경상북도', lat: 37.2425, lon: 131.8683, rom: 'dokdo' },

    // 경상남도
    { n: '창원', full: '창원시', p: '경상남도', lat: 35.2281, lon: 128.6811, rom: 'changwon' },
    { n: '마산', full: '창원시 마산', p: '경상남도', lat: 35.2055, lon: 128.5786, rom: 'masan' },
    { n: '진해', full: '창원시 진해', p: '경상남도', lat: 35.1494, lon: 128.6633, rom: 'jinhae' },
    { n: '진주', full: '진주시', p: '경상남도', lat: 35.1802, lon: 128.1076, rom: 'jinju' },
    { n: '통영', full: '통영시', p: '경상남도', lat: 34.8544, lon: 128.4332, rom: 'tongyeong' },
    { n: '사천', full: '사천시', p: '경상남도', lat: 35.0037, lon: 128.0642, rom: 'sacheon' },
    { n: '김해', full: '김해시', p: '경상남도', lat: 35.2285, lon: 128.8894, rom: 'gimhae' },
    { n: '밀양', full: '밀양시', p: '경상남도', lat: 35.5038, lon: 128.7466, rom: 'miryang' },
    { n: '거제', full: '거제시', p: '경상남도', lat: 34.8806, lon: 128.6211, rom: 'geoje' },
    { n: '양산', full: '양산시', p: '경상남도', lat: 35.3350, lon: 129.0373, rom: 'yangsan' },
    { n: '의령', full: '의령군', p: '경상남도', lat: 35.3223, lon: 128.2618, rom: 'uiryeong' },
    { n: '함안', full: '함안군', p: '경상남도', lat: 35.2725, lon: 128.4065, rom: 'haman' },
    { n: '창녕', full: '창녕군', p: '경상남도', lat: 35.5413, lon: 128.4922, rom: 'changnyeong' },
    { n: '남해', full: '남해군', p: '경상남도', lat: 34.8377, lon: 127.8924, rom: 'namhae' },
    { n: '하동', full: '하동군', p: '경상남도', lat: 35.0673, lon: 127.7513, rom: 'hadong' },
    { n: '산청', full: '산청군', p: '경상남도', lat: 35.4154, lon: 127.8735, rom: 'sancheong' },
    { n: '함양', full: '함양군', p: '경상남도', lat: 35.5205, lon: 127.7252, rom: 'hamyang' },
    { n: '거창', full: '거창군', p: '경상남도', lat: 35.6867, lon: 127.9095, rom: 'geochang' },
    { n: '합천', full: '합천군', p: '경상남도', lat: 35.5667, lon: 128.1658, rom: 'hapcheon' }
  ];

  KOREAN_REGIONS.forEach(r => {
    const loc = { name: r.full, country: '대한민국 🇰🇷', lat: r.lat, lon: r.lon, sub: r.p };
    MAJOR_CITIES_DICT[r.n] = loc;
    MAJOR_CITIES_DICT[r.full] = loc;
    MAJOR_CITIES_DICT[r.p + ' ' + r.n] = loc;
    MAJOR_CITIES_DICT[r.p + ' ' + r.full] = loc;
    if (r.rom) {
      MAJOR_CITIES_DICT[r.rom] = loc;
    }
    const shortP = r.p.replace(/(특별자치도|특별자치시|광역시|특별시|도)/, '');
    if (shortP) {
      MAJOR_CITIES_DICT[shortP + ' ' + r.n] = loc;
      MAJOR_CITIES_DICT[shortP + ' ' + r.full] = loc;
      MAJOR_CITIES_DICT[shortP + r.n] = loc;
      MAJOR_CITIES_DICT[shortP + r.full] = loc;
    }
  });

  // Global Major Cities
  const GLOBAL_CITIES = [
    { n: '도쿄', full: '도쿄', country: '일본 🇯🇵', lat: 35.6762, lon: 139.6503, sub: '간토 지방', rom: 'tokyo' },
    { n: '오사카', full: '오사카', country: '일본 🇯🇵', lat: 34.6937, lon: 135.5023, sub: '간사이 지방', rom: 'osaka' },
    { n: '후쿠오카', full: '후쿠오카', country: '일본 🇯🇵', lat: 33.5902, lon: 130.4017, sub: '규슈 지방', rom: 'fukuoka' },
    { n: '삿포로', full: '삿포로', country: '일본 🇯🇵', lat: 43.0618, lon: 141.3545, sub: '홋카이도', rom: 'sapporo' },
    { n: '베이징', full: '베이징', country: '중국 🇨🇳', lat: 39.9042, lon: 116.4074, sub: '직할시', rom: 'beijing' },
    { n: '상하이', full: '상하이', country: '중국 🇨🇳', lat: 31.2304, lon: 121.4737, sub: '직할시', rom: 'shanghai' },
    { n: '홍콩', full: '홍콩', country: '홍콩 🇭🇰', lat: 22.3193, lon: 114.1694, sub: '특별행정구', rom: 'hong kong' },
    { n: '타이베이', full: '타이베이', country: '대만 🇹🇼', lat: 25.0330, lon: 121.5654, sub: '수도', rom: 'taipei' },
    { n: '방콕', full: '방콕', country: '태국 🇹🇭', lat: 13.7563, lon: 100.5018, sub: '수도', rom: 'bangkok' },
    { n: '싱가포르', full: '싱가포르', country: '싱가포르 🇸🇬', lat: 1.3521, lon: 103.8198, sub: '도시국가', rom: 'singapore' },
    { n: '파리', full: '파리', country: '프랑스 🇫🇷', lat: 48.8566, lon: 2.3522, sub: '일드프랑스', rom: 'paris' },
    { n: '런던', full: '런던', country: '영국 🇬🇧', lat: 51.5074, lon: -0.1278, sub: '그레이터 런던', rom: 'london' },
    { n: '베를린', full: '베를린', country: '독일 🇩🇪', lat: 52.5200, lon: 13.4050, sub: '수도', rom: 'berlin' },
    { n: '로마', full: '로마', country: '이탈리아 🇮🇹', lat: 41.9028, lon: 12.4964, sub: '라치오', rom: 'rome' },
    { n: '마드리드', full: '마드리드', country: '스페인 🇪🇸', lat: 40.4168, lon: -3.7038, sub: '수도', rom: 'madrid' },
    { n: '뉴욕', full: '뉴욕', country: '미국 🇺🇸', lat: 40.7128, lon: -74.0060, sub: '뉴욕주', rom: 'new york' },
    { n: '로스앤젤레스', full: '로스앤젤레스', country: '미국 🇺🇸', lat: 34.0522, lon: -118.2437, sub: '캘리포니아주', rom: 'los angeles' },
    { n: '샌프란시스코', full: '샌프란시스코', country: '미국 🇺🇸', lat: 37.7749, lon: -122.4194, sub: '캘리포니아주', rom: 'san francisco' },
    { n: '시애틀', full: '시애틀', country: '미국 🇺🇸', lat: 47.6062, lon: -122.3321, sub: '워싱턴주', rom: 'seattle' },
    { n: '하와이', full: '호놀룰루 (하와이)', country: '미국 🇺🇸', lat: 21.3069, lon: -157.8583, sub: '하와이주', rom: 'hawaii' },
    { n: '시드니', full: '시드니', country: '호주 🇦🇺', lat: -33.8688, lon: 151.2093, sub: '뉴사우스웨일스', rom: 'sydney' },
    { n: '토론토', full: '토론토', country: '캐나다 🇨🇦', lat: 43.6532, lon: -79.3832, sub: '온타리오주', rom: 'toronto' }
  ];

  GLOBAL_CITIES.forEach(g => {
    const loc = { name: g.full, country: g.country, lat: g.lat, lon: g.lon, sub: g.sub };
    MAJOR_CITIES_DICT[g.n] = loc;
    if (g.rom) {
      MAJOR_CITIES_DICT[g.rom] = loc;
    }
  });

  // -------------------------------------------------------------
  // 2. Weather Code Mapping (WMO Standards)
  // -------------------------------------------------------------
  const WEATHER_CODES = {
    0: { text: '맑음', dayEmoji: '☀️', nightEmoji: '🌙', theme: 'clear' },
    1: { text: '대체로 맑음', dayEmoji: '🌤️', nightEmoji: '🌤️', theme: 'clear' },
    2: { text: '구름 조금', dayEmoji: '⛅', nightEmoji: '☁️', theme: 'clouds' },
    3: { text: '흐림', dayEmoji: '☁️', nightEmoji: '☁️', theme: 'clouds' },
    45: { text: '안개', dayEmoji: '🌫️', nightEmoji: '🌫️', theme: 'fog' },
    48: { text: '서리 안개', dayEmoji: '🌫️', nightEmoji: '🌫️', theme: 'fog' },
    51: { text: '약한 이슬비', dayEmoji: '🌦️', nightEmoji: '🌦️', theme: 'rain' },
    53: { text: '이슬비', dayEmoji: '🌦️', nightEmoji: '🌦️', theme: 'rain' },
    55: { text: '강한 이슬비', dayEmoji: '🌧️', nightEmoji: '🌧️', theme: 'rain' },
    56: { text: '약한 어는 이슬비', dayEmoji: '🌨️', nightEmoji: '🌨️', theme: 'snow' },
    57: { text: '강한 어는 이슬비', dayEmoji: '🌨️', nightEmoji: '🌨️', theme: 'snow' },
    61: { text: '약한 비', dayEmoji: '🌧️', nightEmoji: '🌧️', theme: 'rain' },
    63: { text: '비', dayEmoji: '🌧️', nightEmoji: '🌧️', theme: 'rain' },
    65: { text: '강한 비', dayEmoji: '🌧️', nightEmoji: '🌧️', theme: 'rain' },
    66: { text: '약한 어는 비', dayEmoji: '🌨️', nightEmoji: '🌨️', theme: 'snow' },
    67: { text: '강한 어는 비', dayEmoji: '🌨️', nightEmoji: '🌨️', theme: 'snow' },
    71: { text: '약한 눈', dayEmoji: '🌨️', nightEmoji: '🌨️', theme: 'snow' },
    73: { text: '눈', dayEmoji: '❄️', nightEmoji: '❄️', theme: 'snow' },
    75: { text: '강한 눈', dayEmoji: '❄️', nightEmoji: '❄️', theme: 'snow' },
    77: { text: '싸락눈', dayEmoji: '🌨️', nightEmoji: '🌨️', theme: 'snow' },
    80: { text: '약한 소나기', dayEmoji: '🌦️', nightEmoji: '🌦️', theme: 'rain' },
    81: { text: '소나기', dayEmoji: '🌦️', nightEmoji: '🌦️', theme: 'rain' },
    82: { text: '강한 소나기', dayEmoji: '🌧️', nightEmoji: '🌧️', theme: 'rain' },
    85: { text: '약한 눈 소나기', dayEmoji: '🌨️', nightEmoji: '🌨️', theme: 'snow' },
    86: { text: '강한 눈 소나기', dayEmoji: '🌨️', nightEmoji: '🌨️', theme: 'snow' },
    95: { text: '뇌우', dayEmoji: '⛈️', nightEmoji: '⛈️', theme: 'thunder' },
    96: { text: '우박을 동반한 약한 뇌우', dayEmoji: '⛈️', nightEmoji: '⛈️', theme: 'thunder' },
    99: { text: '우박을 동반한 강한 뇌우', dayEmoji: '⛈️', nightEmoji: '⛈️', theme: 'thunder' }
  };

  function getWeatherInfo(code, isDay = 1) {
    const entry = WEATHER_CODES[code] || {
      text: '흐림',
      dayEmoji: '⛅',
      nightEmoji: '☁️',
      theme: 'clouds'
    };
    const emoji = isDay ? entry.dayEmoji : entry.nightEmoji;
    let themeClass = 'theme-' + entry.theme;
    if (entry.theme === 'clear') {
      themeClass = isDay ? 'theme-clear-day' : 'theme-clear-night';
    }
    return {
      text: entry.text,
      emoji: emoji,
      themeClass: themeClass,
      rawTheme: entry.theme
    };
  }

  // -------------------------------------------------------------
  // 3. Application State
  // -------------------------------------------------------------
  const state = {
    unit: 'c', // 'c' or 'f'
    currentLocation: null,
    weatherData: null,
    recentSearches: []
  };

  // -------------------------------------------------------------
  // 4. DOM Elements
  // -------------------------------------------------------------
  const el = {
    body: document.body,
    ambientBg: document.getElementById('ambientBg'),
    particlesContainer: document.getElementById('particlesContainer'),
    liveClock: document.getElementById('currentTimeText'),
    btnLocation: document.getElementById('btnLocation'),
    btnUnitToggle: document.getElementById('btnUnitToggle'),
    unitOptions: document.querySelectorAll('.unit-option'),
    
    // Search
    searchForm: document.getElementById('searchForm'),
    searchInput: document.getElementById('searchInput'),
    btnClearInput: document.getElementById('btnClearInput'),
    btnSearch: document.getElementById('btnSearch'),
    quickChipsRow: document.getElementById('quickChipsRow'),
    recentSearchesContainer: document.getElementById('recentSearchesContainer'),
    recentChipsList: document.getElementById('recentChipsList'),
    btnRecentClearAll: document.getElementById('btnRecentClearAll'),

    // Feedback
    feedbackCard: document.getElementById('feedbackCard'),
    feedbackTitle: document.getElementById('feedbackTitle'),
    feedbackMessage: document.getElementById('feedbackMessage'),
    feedbackTips: document.getElementById('feedbackTips'),
    btnFeedbackRetry: document.getElementById('btnFeedbackRetry'),
    btnFeedbackClose: document.getElementById('btnFeedbackClose'),

    // Loading & Dashboard
    loadingContainer: document.getElementById('loadingContainer'),
    weatherDashboard: document.getElementById('weatherDashboard'),
    btnRefresh: document.getElementById('btnRefresh'),

    // Hero
    countryTag: document.getElementById('countryTag'),
    cityName: document.getElementById('cityName'),
    citySubtext: document.getElementById('citySubtext'),
    heroEmoji: document.getElementById('heroEmoji'),
    conditionBadge: document.getElementById('conditionBadge'),
    currentTemp: document.getElementById('currentTemp'),
    currentTempUnit: document.getElementById('currentTempUnit'),
    maxTemp: document.getElementById('maxTemp'),
    minTemp: document.getElementById('minTemp'),
    feelsLikeTemp: document.getElementById('feelsLikeTemp'),
    adviceText: document.getElementById('adviceText'),

    // Metrics
    cardFeelsLike: document.getElementById('cardFeelsLike'),
    cardFeelsDesc: document.getElementById('cardFeelsDesc'),
    cardHumidity: document.getElementById('cardHumidity'),
    cardHumidityDesc: document.getElementById('cardHumidityDesc'),
    humidityProgress: document.getElementById('humidityProgress'),
    cardWindSpeed: document.getElementById('cardWindSpeed'),
    cardWindDesc: document.getElementById('cardWindDesc'),
    compassArrow: document.getElementById('compassArrow'),
    cardPrecip: document.getElementById('cardPrecip'),
    cardPrecipDesc: document.getElementById('cardPrecipDesc'),
    cardUv: document.getElementById('cardUv'),
    badgeUv: document.getElementById('badgeUv'),
    cardUvDesc: document.getElementById('cardUvDesc'),
    cardPressure: document.getElementById('cardPressure'),
    cardPressureDesc: document.getElementById('cardPressureDesc'),

    // Forecasts
    hourlyTrack: document.getElementById('hourlyTrack'),
    dailyList: document.getElementById('dailyList')
  };

  // -------------------------------------------------------------
  // 5. Utility Functions
  // -------------------------------------------------------------
  function formatTemp(tempC) {
    if (tempC === null || tempC === undefined || isNaN(tempC)) return '--';
    if (state.unit === 'f') {
      return Math.round((tempC * 9) / 5 + 32);
    }
    return Math.round(tempC);
  }

  function getWindDirectionText(deg) {
    const directions = ['북풍', '북동풍', '동풍', '남동풍', '남풍', '남서풍', '서풍', '북서풍'];
    const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8;
    return directions[index];
  }

  function getUvInfo(uv) {
    if (uv === null || uv === undefined) return { label: '보통', color: '#fbbf24', desc: '자외선 보통' };
    const val = Number(uv);
    if (val <= 2) return { label: '낮음', color: '#34d399', desc: '자외선 지수가 낮아 안심할 수 있어요' };
    if (val <= 5) return { label: '보통', color: '#fbbf24', desc: '낮 시간대 자외선 차단제 권장' };
    if (val <= 7) return { label: '높음', color: '#f97316', desc: '모자, 선글라스, 자외선 차단제 필수' };
    if (val <= 10) return { label: '매우 높음', color: '#ef4444', desc: '오전 10시~오후 3시 야외활동 자제' };
    return { label: '위험', color: '#a855f7', desc: '햇볕 노출 위험! 실내 머무름 권장' };
  }

  function getAdvice(tempC, weatherCode, rainMm, windKmh, uv) {
    const windMs = (windKmh || 0) / 3.6;
    
    // Precipitation & severe
    if ([95, 96, 99].includes(weatherCode)) {
      return '천둥과 번개를 동반한 뇌우가 있습니다. 실내에 안전하게 머무르세요 ⚡';
    }
    if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
      return '눈이 내리고 있습니다. 도로 결빙과 빙판길 안전사고에 유의하세요 ❄️';
    }
    if (rainMm > 0.5 || [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
      return '비 소식이 있습니다. 외출 시 튼튼한 우산을 꼭 챙기세요 ☔';
    }

    // Extreme Temperature
    if (tempC <= 0) {
      return '영하의 추위입니다. 두꺼운 패딩과 장갑, 목도리로 든든하게 무장하세요 🧣';
    }
    if (tempC <= 8) {
      return '쌀쌀한 날씨입니다. 따뜻한 외투를 입고 체온 유지에 신경 쓰세요 🧥';
    }
    if (tempC >= 30) {
      return '무더운 날씨입니다. 충분한 수분을 섭취하고 그늘에서 휴식을 취하세요 🥤';
    }

    // Wind & UV
    if (windMs >= 8) {
      return '바람이 다소 강하게 불고 있어요. 가벼운 소지품 날림에 주의하세요 💨';
    }
    if (uv >= 7) {
      return '자외선이 강한 날씨입니다. 자외선 차단제를 바르고 모자를 착용하세요 ☀️';
    }

    // Pleasant
    if (tempC >= 18 && tempC <= 24) {
      return '화창하고 선선하여 야외 활동이나 산책을 즐기기에 더없이 좋은 날씨입니다 🌿';
    }

    return '오늘 하루도 쾌적하고 건강하게 보내세요! 😊';
  }

  // -------------------------------------------------------------
  // 6. Clock & Particle System
  // -------------------------------------------------------------
  function updateLiveClock() {
    const now = new Date();
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const day = days[now.getDay()];
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? '오후' : '오전';
    const displayHours = hours % 12 || 12;

    el.liveClock.textContent = `${month}월 ${date}일 (${day}) ${ampm} ${displayHours}:${minutes}`;
  }

  function spawnParticles(theme) {
    el.particlesContainer.innerHTML = '';
    let count = 0;
    let className = '';

    if (theme === 'rain') {
      count = 45;
      className = 'rain-drop';
    } else if (theme === 'snow') {
      count = 35;
      className = 'snow-flake';
    } else {
      return;
    }

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = className;
      p.style.left = Math.random() * 100 + '%';
      
      if (theme === 'rain') {
        p.style.height = (Math.random() * 25 + 15) + 'px';
        p.style.animationDuration = (Math.random() * 0.4 + 0.6) + 's';
        p.style.animationDelay = (Math.random() * 2) + 's';
      } else if (theme === 'snow') {
        const size = Math.random() * 4 + 2;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.animationDuration = (Math.random() * 4 + 4) + 's';
        p.style.animationDelay = (Math.random() * 5) + 's';
      }

      el.particlesContainer.appendChild(p);
    }
  }

  // -------------------------------------------------------------
  // 7. Location Geocoding (Dictionary + Romanization + Open-Meteo + Photon)
  // -------------------------------------------------------------
  function romanizeHangul(str) {
    const CHO = ['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj','ch','k','t','p','h'];
    const JUNG = ['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','ui','i'];
    const JONG = ['','k','k','ks','n','nj','nh','t','l','lg','lm','lb','ls','lt','lp','lh','m','p','ps','s','ss','ng','j','ch','k','t','p','h'];
    
    let res = '';
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i) - 44032;
      if (code >= 0 && code <= 11171) {
        const cho = Math.floor(code / 588);
        const jung = Math.floor((code % 588) / 28);
        const jong = code % 28;
        res += CHO[cho] + JUNG[jung] + JONG[jong];
      } else {
        res += str[i];
      }
    }
    return res;
  }

  function findLocationInDictionary(query) {
    const q = query.trim().replace(/\s+/g, ' ');
    const qClean = q.replace(/[\s·,]+/g, '');
    const lower = q.toLowerCase();

    // 1. Direct key match
    if (MAJOR_CITIES_DICT[q]) return MAJOR_CITIES_DICT[q];
    if (MAJOR_CITIES_DICT[lower]) return MAJOR_CITIES_DICT[lower];
    if (MAJOR_CITIES_DICT[qClean]) return MAJOR_CITIES_DICT[qClean];

    // 2. Strip / Add common Korean suffixes: '시', '군', '구', '도'
    const stripped = q.replace(/(특별시|광역시|특별자치시|특별자치도|시|군|구|도)$/g, '').trim();
    if (stripped) {
      if (MAJOR_CITIES_DICT[stripped]) return MAJOR_CITIES_DICT[stripped];
      if (MAJOR_CITIES_DICT[stripped + '시']) return MAJOR_CITIES_DICT[stripped + '시'];
      if (MAJOR_CITIES_DICT[stripped + '군']) return MAJOR_CITIES_DICT[stripped + '군'];
      if (MAJOR_CITIES_DICT[stripped + '구']) return MAJOR_CITIES_DICT[stripped + '구'];
    }

    // 3. Match by sub-words (e.g. "전북 익산" -> ["전북", "익산"])
    const tokens = q.split(' ');
    for (const token of tokens) {
      if (MAJOR_CITIES_DICT[token]) return MAJOR_CITIES_DICT[token];
      const tokenStrip = token.replace(/(시|군|구|도)$/g, '');
      if (tokenStrip && MAJOR_CITIES_DICT[tokenStrip]) return MAJOR_CITIES_DICT[tokenStrip];
    }

    // 4. Substring search in dictionary keys
    for (const [key, loc] of Object.entries(MAJOR_CITIES_DICT)) {
      if (key.length >= 2 && (qClean.includes(key) || key.includes(qClean))) {
        return loc;
      }
    }

    return null;
  }

  async function resolveLocation(query) {
    const cleanQuery = query.trim();
    if (!cleanQuery) return null;

    // 1. Check comprehensive national & global dictionary
    const dictMatch = findLocationInDictionary(cleanQuery);
    if (dictMatch) {
      return dictMatch;
    }

    // 2. Korean Romanization + Open-Meteo with Korean prioritizing
    if (/[\uac00-\ud7a3]/.test(cleanQuery)) {
      try {
        const rom = romanizeHangul(cleanQuery);
        const omRomUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(rom)}&count=10&language=ko&format=json`;
        const res = await fetch(omRomUrl);
        if (res.ok) {
          const data = await res.json();
          if (data.results && data.results.length > 0) {
            // Prioritize Korean results
            const krResult = data.results.find(r => r.country_code === 'KR' || r.country === '대한민국') || data.results[0];
            return {
              name: krResult.name || cleanQuery,
              country: krResult.country || '대한민국 🇰🇷',
              sub: krResult.admin1 || '',
              lat: krResult.latitude,
              lon: krResult.longitude
            };
          }
        }
      } catch (e) {
        console.warn('Romanized Open-Meteo geocoding error:', e);
      }
    }

    // 3. Open-Meteo Geocoding directly with query
    try {
      const omUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanQuery)}&count=5&language=ko&format=json`;
      const res = await fetch(omUrl);
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          const top = data.results[0];
          return {
            name: top.name,
            country: top.country || '',
            sub: top.admin1 || '',
            lat: top.latitude,
            lon: top.longitude
          };
        }
      }
    } catch (err) {
      console.warn('Open-Meteo geocoding error:', err);
    }

    // 4. Photon Geocoder (with 3-second timeout)
    try {
      const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(cleanQuery)}&limit=5`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const res = await fetch(photonUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (data.features && data.features.length > 0) {
          let best = data.features[0];
          for (const f of data.features) {
            const props = f.properties || {};
            if (['city', 'town', 'administrative', 'region', 'state'].includes(props.type) ||
                ['place', 'boundary'].includes(props.osm_key)) {
              best = f;
              break;
            }
          }
          const props = best.properties;
          const coords = best.geometry.coordinates; // [lon, lat]
          return {
            name: props.name || cleanQuery,
            country: props.country || '대한민국',
            sub: props.state || props.city || props.district || '',
            lat: coords[1],
            lon: coords[0]
          };
        }
      }
    } catch (err) {
      console.warn('Photon geocoding error:', err);
    }

    return null;
  }

  // Reverse Geocoding for GPS (BigDataCloud + Open-Meteo fallback)
  async function reverseGeocode(lat, lon) {
    try {
      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=ko`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const city = data.city || data.locality || data.principalSubdivision || '내 위치';
        const sub = data.principalSubdivision || '';
        const country = data.countryName || '대한민국';
        return {
          name: city,
          sub: sub,
          country: country,
          lat: lat,
          lon: lon
        };
      }
    } catch (e) {
      console.warn('Reverse geocode error:', e);
    }

    return {
      name: '현재 내 위치',
      sub: 'GPS 기반',
      country: '대한민국',
      lat: lat,
      lon: lon
    };
  }

  // -------------------------------------------------------------
  // 8. Fetch Weather Data (Open-Meteo API)
  // -------------------------------------------------------------
  async function fetchWeatherData(lat, lon) {
    const params = new URLSearchParams({
      latitude: lat.toFixed(4),
      longitude: lon.toFixed(4),
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure',
      hourly: 'temperature_2m,relative_humidity_2m,precipitation_probability,weather_code',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max',
      timezone: 'auto'
    });

    const apiUrl = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`기상청 API 응답 오류 (HTTP ${response.status})`);
    }
    return await response.json();
  }

  // -------------------------------------------------------------
  // 9. Render Weather Dashboard
  // -------------------------------------------------------------
  function renderWeatherUI() {
    const loc = state.currentLocation;
    const data = state.weatherData;
    if (!loc || !data) return;

    const current = data.current;
    const daily = data.daily;
    const hourly = data.hourly;

    const weatherInfo = getWeatherInfo(current.weather_code, current.is_day);

    // Dynamic Theme & Particles
    document.body.className = weatherInfo.themeClass;
    spawnParticles(weatherInfo.rawTheme);

    // 1. Hero Card
    el.countryTag.textContent = loc.country;
    el.cityName.textContent = loc.name;
    
    const nowTime = new Date();
    const timeStr = `${String(nowTime.getHours()).padStart(2, '0')}:${String(nowTime.getMinutes()).padStart(2, '0')}`;
    el.citySubtext.textContent = `${loc.sub ? loc.sub + ' · ' : ''}오늘 ${timeStr} 기준`;

    el.heroEmoji.textContent = weatherInfo.emoji;
    el.conditionBadge.textContent = weatherInfo.text;
    el.currentTemp.textContent = formatTemp(current.temperature_2m);
    el.currentTempUnit.textContent = state.unit === 'f' ? '°F' : '°C';

    const maxT = daily.temperature_2m_max[0];
    const minT = daily.temperature_2m_min[0];
    el.maxTemp.textContent = `${formatTemp(maxT)}°`;
    el.minTemp.textContent = `${formatTemp(minT)}°`;
    el.feelsLikeTemp.textContent = `${formatTemp(current.apparent_temperature)}°`;

    const uvToday = daily.uv_index_max[0];
    el.adviceText.textContent = getAdvice(
      current.temperature_2m,
      current.weather_code,
      current.precipitation,
      current.wind_speed_10m,
      uvToday
    );

    // 2. Metrics Grid
    // Apparent Temp
    el.cardFeelsLike.textContent = `${formatTemp(current.apparent_temperature)}°`;
    const tempDiff = current.apparent_temperature - current.temperature_2m;
    if (tempDiff <= -2) {
      el.cardFeelsDesc.textContent = '바람 등의 영향으로 실제보다 쌀쌀하게 느껴져요';
    } else if (tempDiff >= 2) {
      el.cardFeelsDesc.textContent = '습도 등의 영향으로 실제보다 덥게 느껴져요';
    } else {
      el.cardFeelsDesc.textContent = '실제 기온과 비슷하게 체감되는 쾌적한 상태예요';
    }

    // Humidity
    const hum = Math.round(current.relative_humidity_2m);
    el.cardHumidity.textContent = `${hum}%`;
    el.humidityProgress.style.width = `${Math.min(hum, 100)}%`;
    if (hum < 35) {
      el.cardHumidityDesc.textContent = '공기가 다소 건조해요. 수분 보충을 추천해요';
    } else if (hum > 70) {
      el.cardHumidityDesc.textContent = '습도가 높은 편이에요. 쾌적한 환기가 필요해요';
    } else {
      el.cardHumidityDesc.textContent = '적정 습도 범위로 매우 쾌적한 상태예요';
    }

    // Wind Speed & Direction
    const windMs = (current.wind_speed_10m / 3.6).toFixed(1);
    el.cardWindSpeed.innerHTML = `${windMs} <small>m/s</small>`;
    const windDirText = getWindDirectionText(current.wind_direction_10m);
    el.compassArrow.style.transform = `rotate(${current.wind_direction_10m}deg)`;
    el.cardWindDesc.textContent = `${windDirText} · ${windMs < 3 ? '선선한 바람' : windMs < 8 ? '산들바람' : '강한 바람'}`;

    // Precipitation
    const precipMm = current.precipitation.toFixed(1);
    el.cardPrecip.innerHTML = `${precipMm} <small>mm</small>`;
    if (current.precipitation > 0) {
      el.cardPrecipDesc.textContent = '현재 강수가 기록되고 있습니다';
    } else {
      el.cardPrecipDesc.textContent = '현재 비나 눈 소식이 없어요';
    }

    // UV Index
    const uvInfo = getUvInfo(uvToday);
    el.cardUv.innerHTML = `${Math.round(uvToday)} <span class="badge-uv" id="badgeUv" style="background:${uvInfo.color}33; border-color:${uvInfo.color}; color:${uvInfo.color}">${uvInfo.label}</span>`;
    el.cardUvDesc.textContent = uvInfo.desc;

    // Air Pressure
    const pressure = Math.round(current.surface_pressure);
    el.cardPressure.innerHTML = `${pressure} <small>hPa</small>`;
    if (pressure > 1020) {
      el.cardPressureDesc.textContent = '고기압 영향권 (맑고 쾌청한 대기)';
    } else if (pressure < 1005) {
      el.cardPressureDesc.textContent = '저기압 영향권 (구름 또는 비 가능성)';
    } else {
      el.cardPressureDesc.textContent = '표준 대기압 범위 (안정적)';
    }

    // 3. Hourly Forecast (24 Hours starting from current hour)
    renderHourlyForecast(hourly, current.time);

    // 4. Daily 7-Day Forecast
    renderDailyForecast(daily);

    // Show Dashboard, Hide feedback & loading
    el.weatherDashboard.hidden = false;
    hideLoading();
    hideFeedback();

    // Sync active chips in quick chips
    updateActiveChip(loc.name);
  }

  function renderHourlyForecast(hourly, currentTimeStr) {
    el.hourlyTrack.innerHTML = '';
    if (!hourly || !hourly.time) return;

    const currentHourIndex = hourly.time.findIndex(t => t.startsWith(currentTimeStr.slice(0, 13)));
    const startIndex = currentHourIndex >= 0 ? currentHourIndex : 0;
    const next24 = hourly.time.slice(startIndex, startIndex + 24);

    next24.forEach((timeStr, i) => {
      const dataIndex = startIndex + i;
      const temp = hourly.temperature_2m[dataIndex];
      const code = hourly.weather_code[dataIndex];
      const pop = hourly.precipitation_probability ? hourly.precipitation_probability[dataIndex] : 0;

      const dateObj = new Date(timeStr);
      const hour = dateObj.getHours();
      const isDay = (hour >= 6 && hour < 19) ? 1 : 0;
      const info = getWeatherInfo(code, isDay);

      const isNow = i === 0;
      const displayTime = isNow ? '지금' : `${String(hour).padStart(2, '0')}:00`;

      const card = document.createElement('div');
      card.className = `hourly-card${isNow ? ' current-now' : ''}`;
      card.innerHTML = `
        <span class="hourly-time">${displayTime}</span>
        <span class="hourly-emoji" title="${info.text}">${info.emoji}</span>
        <span class="hourly-temp">${formatTemp(temp)}°</span>
        ${pop > 10 ? `<span class="hourly-pop">💧${pop}%</span>` : ''}
      `;
      el.hourlyTrack.appendChild(card);
    });
  }

  function renderDailyForecast(daily) {
    el.dailyList.innerHTML = '';
    if (!daily || !daily.time) return;

    const days = ['일', '월', '화', '수', '목', '금', '토'];

    // Find global min and max for range bar scaling
    const allMins = daily.temperature_2m_min;
    const allMaxs = daily.temperature_2m_max;
    const globalMin = Math.min(...allMins);
    const globalMax = Math.max(...allMaxs);
    const rangeSpan = Math.max(globalMax - globalMin, 1);

    daily.time.forEach((dateStr, i) => {
      const code = daily.weather_code[i];
      const min = daily.temperature_2m_min[i];
      const max = daily.temperature_2m_max[i];
      const info = getWeatherInfo(code, 1);

      const d = new Date(dateStr);
      const dayName = days[d.getDay()];
      const monthDate = `${d.getMonth() + 1}.${d.getDate()}`;

      let dayLabel = `${dayName}요일`;
      if (i === 0) dayLabel = '오늘';
      else if (i === 1) dayLabel = '내일';
      else if (i === 2) dayLabel = '모레';

      // Calculate bar fill position
      const leftPercent = Math.max(0, ((min - globalMin) / rangeSpan) * 100);
      const widthPercent = Math.max(10, ((max - min) / rangeSpan) * 100);

      const row = document.createElement('div');
      row.className = `daily-row${i === 0 ? ' today' : ''}`;
      row.innerHTML = `
        <div class="daily-date-col">
          <span class="daily-day">${dayLabel}</span>
          <span class="daily-date">${monthDate}</span>
        </div>
        <div class="daily-condition-col">
          <span class="daily-emoji">${info.emoji}</span>
          <span class="daily-condition-name">${info.text}</span>
        </div>
        <div class="daily-bar-col">
          <div class="temp-range-track">
            <div class="temp-range-fill" style="left: ${leftPercent}%; width: ${widthPercent}%;"></div>
          </div>
        </div>
        <div class="daily-temps-col">
          <span class="temp-min-text">${formatTemp(min)}°</span>
          <span class="temp-max-text">${formatTemp(max)}°</span>
        </div>
      `;
      el.dailyList.appendChild(row);
    });
  }

  // -------------------------------------------------------------
  // 10. Feedback (안내 메시지 & 에러)
  // -------------------------------------------------------------
  function showFeedback(type, title, message, query = '') {
    el.feedbackTitle.textContent = title;
    el.feedbackMessage.innerHTML = message;
    el.feedbackCard.hidden = false;
    el.feedbackCard.style.display = 'flex';
    
    if (type === 'not-found') {
      el.feedbackCard.className = 'feedback-card warning-style';
      el.feedbackTips.hidden = false;
      el.feedbackTips.style.display = 'block';
      el.btnFeedbackRetry.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        <span>서울 날씨 보기</span>
      `;
      el.btnFeedbackRetry.onclick = () => loadCityWeather('서울');
    } else {
      el.feedbackCard.className = 'feedback-card';
      el.feedbackTips.hidden = true;
      el.feedbackTips.style.display = 'none';
      el.btnFeedbackRetry.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        <span>다시 시도하기</span>
      `;
      el.btnFeedbackRetry.onclick = () => {
        if (state.currentLocation) {
          loadWeatherForCoords(state.currentLocation);
        } else {
          loadCityWeather('서울');
        }
      };
    }

    // Scroll to feedback card smoothly if needed
    el.feedbackCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideFeedback() {
    el.feedbackCard.hidden = true;
    el.feedbackCard.style.display = 'none';
  }

  function showLoading() {
    el.loadingContainer.hidden = false;
    el.loadingContainer.style.display = 'flex';
  }

  function hideLoading() {
    el.loadingContainer.hidden = true;
    el.loadingContainer.style.display = 'none';
  }

  // -------------------------------------------------------------
  // 11. Main Weather Controller
  // -------------------------------------------------------------
  async function loadCityWeather(query) {
    if (!query || !query.trim()) {
      showFeedback('not-found', '지역명을 입력해 주세요', '날씨를 조회하고 싶은 도시나 지역명을 입력창에 입력해 주세요.');
      return;
    }

    const cleanQuery = query.trim();

    // Show loading
    showLoading();
    hideFeedback();

    try {
      const loc = await resolveLocation(cleanQuery);
      if (!loc) {
        hideLoading();
        showFeedback(
          'not-found',
          `'${cleanQuery}' 지역을 찾을 수 없습니다`,
          `입력하신 <strong>"${cleanQuery}"</strong>에 대한 위치 정보를 찾지 못했습니다. 아래 검색 팁을 참고해 다시 검색해 보세요.`,
          cleanQuery
        );
        return;
      }

      await loadWeatherForCoords(loc);
      addRecentSearch(loc.name);
    } catch (err) {
      console.error('Weather load error:', err);
      hideLoading();
      showFeedback(
        'error',
        '날씨 정보를 불러오지 못했습니다',
        '일시적인 네트워크 지연 또는 기상 데이터 서비스 연결 장애가 발생했습니다. 잠시 후 다시 시도해 주세요.'
      );
    }
  }

  async function loadWeatherForCoords(loc) {
    showLoading();
    hideFeedback();

    try {
      const weather = await fetchWeatherData(loc.lat, loc.lon);
      state.currentLocation = loc;
      state.weatherData = weather;
      renderWeatherUI();
    } catch (err) {
      console.error('API Error:', err);
      hideLoading();
      showFeedback(
        'error',
        '날씨 데이터를 가져오는데 실패했습니다',
        `기상 데이터를 수신하는 중 오류가 발생했습니다 (${err.message}). 네트워크 연결을 확인하고 다시 시도해 주세요.`
      );
    }
  }

  // -------------------------------------------------------------
  // 12. Recent Searches Storage & UI
  // -------------------------------------------------------------
  const RECENT_KEY = 'skypulse_recent_cities';

  function loadRecentSearches() {
    try {
      const saved = localStorage.getItem(RECENT_KEY);
      if (saved) {
        state.recentSearches = JSON.parse(saved);
        renderRecentSearches();
      }
    } catch (e) {}
  }

  function addRecentSearch(cityName) {
    state.recentSearches = state.recentSearches.filter(c => c !== cityName);
    state.recentSearches.unshift(cityName);
    if (state.recentSearches.length > 6) {
      state.recentSearches.pop();
    }
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(state.recentSearches));
    } catch (e) {}
    renderRecentSearches();
  }

  function removeRecentSearch(cityName) {
    state.recentSearches = state.recentSearches.filter(c => c !== cityName);
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(state.recentSearches));
    } catch (e) {}
    renderRecentSearches();
  }

  function clearAllRecentSearches() {
    state.recentSearches = [];
    try {
      localStorage.removeItem(RECENT_KEY);
    } catch (e) {}
    renderRecentSearches();
  }

  function renderRecentSearches() {
    if (state.recentSearches.length === 0) {
      el.recentSearchesContainer.hidden = true;
      return;
    }

    el.recentSearchesContainer.hidden = false;
    el.recentChipsList.innerHTML = '';

    state.recentSearches.forEach(city => {
      const chip = document.createElement('div');
      chip.className = 'recent-chip';
      chip.innerHTML = `
        <span class="recent-chip-text" style="cursor:pointer;">${city}</span>
        <button type="button" class="recent-chip-remove" title="삭제" aria-label="${city} 삭제">×</button>
      `;

      chip.querySelector('.recent-chip-text').addEventListener('click', () => {
        el.searchInput.value = city;
        loadCityWeather(city);
      });

      chip.querySelector('.recent-chip-remove').addEventListener('click', (e) => {
        e.stopPropagation();
        removeRecentSearch(city);
      });

      el.recentChipsList.appendChild(chip);
    });
  }

  function updateActiveChip(activeCity) {
    document.querySelectorAll('.city-chip').forEach(btn => {
      const city = btn.getAttribute('data-city');
      if (activeCity.includes(city) || city.includes(activeCity)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // -------------------------------------------------------------
  // 13. Event Listeners Setup
  // -------------------------------------------------------------
  function setupEventListeners() {
    // Search form submission
    el.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = el.searchInput.value.trim();
      if (query) {
        loadCityWeather(query);
      } else {
        showFeedback('not-found', '지역명을 입력해 주세요', '검색창에 조회하고 싶은 도시명을 입력한 후 검색 버튼을 눌러주세요.');
      }
    });

    // Clear input button
    el.searchInput.addEventListener('input', () => {
      el.btnClearInput.hidden = !el.searchInput.value.trim();
    });

    el.btnClearInput.addEventListener('click', () => {
      el.searchInput.value = '';
      el.btnClearInput.hidden = true;
      el.searchInput.focus();
    });

    // Quick chips click
    el.quickChipsRow.addEventListener('click', (e) => {
      const target = e.target.closest('.city-chip');
      if (target) {
        const city = target.getAttribute('data-city');
        el.searchInput.value = city;
        el.btnClearInput.hidden = false;
        loadCityWeather(city);
      }
    });

    // Temperature Unit toggle (°C / °F)
    el.btnUnitToggle.addEventListener('click', () => {
      state.unit = state.unit === 'c' ? 'f' : 'c';
      el.unitOptions.forEach(opt => {
        opt.classList.toggle('active', opt.getAttribute('data-unit') === state.unit);
      });
      if (state.weatherData) {
        renderWeatherUI();
      }
    });

    // GPS Location button
    el.btnLocation.addEventListener('click', () => {
      if (!navigator.geolocation) {
        showFeedback('not-found', '위치 서비스를 지원하지 않습니다', '사용 중이신 브라우저가 위치 정보 서비스를 지원하지 않습니다.');
        return;
      }

      showLoading();
      hideFeedback();

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const loc = await reverseGeocode(lat, lon);
          el.searchInput.value = loc.name;
          el.btnClearInput.hidden = false;
          await loadWeatherForCoords(loc);
        },
        (error) => {
          hideLoading();
          let msg = '위치 정보를 가져올 수 없습니다.';
          if (error.code === error.PERMISSION_DENIED) {
            msg = '브라우저의 위치 권한이 차단되어 있습니다. 브라우저 설정에서 위치 권한을 허용한 후 다시 시도해 주세요.';
          } else if (error.code === error.TIMEOUT) {
            msg = '위치 정보 요청 시간이 초과되었습니다. 도시명을 직접 검색해 주세요.';
          }
          showFeedback('error', '위치 접근 권한 오류', msg);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    });

    // Refresh button
    el.btnRefresh.addEventListener('click', () => {
      if (state.currentLocation) {
        loadWeatherForCoords(state.currentLocation);
      } else {
        loadCityWeather('서울');
      }
    });

    // Feedback close
    el.btnFeedbackClose.addEventListener('click', hideFeedback);

    // Clear all recent
    el.btnRecentClearAll.addEventListener('click', clearAllRecentSearches);
  }

  // -------------------------------------------------------------
  // 14. Initialization
  // -------------------------------------------------------------
  function init() {
    updateLiveClock();
    setInterval(updateLiveClock, 1000);

    setupEventListeners();
    loadRecentSearches();

    // Default city: 서울 (Seoul)
    loadCityWeather('서울');
  }

  // Start app when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
