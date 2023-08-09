-- CREATE SURVEY TABLE

CREATE TABLE survey
(
    id  BIGSERIAL PRIMARY KEY NOT NULL,
    ver TEXT                  NOT NULL
);

INSERT INTO survey (id, ver)
VALUES (1, '1.5');

-- CREATE VESSEL TABLE
CREATE TABLE vessel
(
    id      BIGSERIAL PRIMARY KEY NOT NULL,
    code    TEXT                  NOT NULL,
    name_en TEXT                  NOT NULL,
    name_jp TEXT                  NOT NULL
);

INSERT INTO vessel (code, name_en, name_jp)
VALUES ('KH', 'Hakuho-Maru', '白鳳丸');
INSERT INTO vessel (code, name_en, name_jp)
VALUES ('KS', 'Shinsei-Maru', '新青丸');
INSERT INTO vessel (code, name_en, name_jp)
VALUES ('YK', 'Yokosuka', 'よこすか');
INSERT INTO vessel (code, name_en, name_jp)
VALUES ('KR', 'Kairei', 'かいれい');
INSERT INTO vessel (code, name_en, name_jp)
VALUES ('MR', 'Mirai', 'みらい');
INSERT INTO vessel (code, name_en, name_jp)
VALUES ('KM', 'Kaimei', 'かいめい');


--  CREATE AGE GROUP TABLE
CREATE TABLE age_group
(
    id      BIGSERIAL PRIMARY KEY NOT NULL,
    name_en TEXT                  NOT NULL,
    name_jp TEXT                  NOT NULL
);

INSERT INTO age_group (name_en, name_jp)
VALUES ('Under 20''s', '20代以下');
INSERT INTO age_group (name_en, name_jp)
VALUES ('20''s', '20代');
INSERT INTO age_group (name_en, name_jp)
VALUES ('30''s', '30代');
INSERT INTO age_group (name_en, name_jp)
VALUES ('40''s', '40代');
INSERT INTO age_group (name_en, name_jp)
VALUES ('50''s', '50代');
INSERT INTO age_group (name_en, name_jp)
VALUES ('60''s', '60代');
INSERT INTO age_group (name_en, name_jp)
VALUES ('Over 60''s', '60代以上');
INSERT INTO age_group (name_en, name_jp)
VALUES ('Other', '回答なし');

-- CREATE CAREER LEVEL TABLE
CREATE TABLE career_level
(
    id      BIGSERIAL PRIMARY KEY NOT NULL,
    name_en TEXT                  NOT NULL,
    name_jp TEXT                  NOT NULL
);

INSERT INTO career_level (name_en, name_jp)
VALUES ('Professor', '教授');
INSERT INTO career_level (name_en, name_jp)
VALUES ('Associate Professor', '准教授');
INSERT INTO career_level (name_en, name_jp)
VALUES ('Lecturer', '助教・講師');
INSERT INTO career_level (name_en, name_jp)
VALUES ('Chief/Senior Researcher', '主任研究員/上席主任研究員');
INSERT INTO career_level (name_en, name_jp)
VALUES ('Researcher', '研究員');
INSERT INTO career_level (name_en, name_jp)
VALUES ('JAMSTEC', 'JAMSTEC');
INSERT INTO career_level (name_en, name_jp)
VALUES ('Postdoctoral Researcher', 'ポスドク研究員');
INSERT INTO career_level (name_en, name_jp)
VALUES ('PhD Student', '博士学生');
INSERT INTO career_level (name_en, name_jp)
VALUES ('Graduate Student', '大学院生');
INSERT INTO career_level (name_en, name_jp)
VALUES ('Undergraduate Student', '学部生');
INSERT INTO career_level (name_en, name_jp)
VALUES ('Technical Staff', '技術職員');
INSERT INTO career_level (name_en, name_jp)
VALUES ('Other', 'その他');

-- CREATE GENDER TABLE
CREATE TABLE gender
(
    id      BIGSERIAL PRIMARY KEY NOT NULL,
    name_en TEXT                  NOT NULL,
    name_jp TEXT                  NOT NULL
);

INSERT INTO gender (name_en, name_jp)
VALUES ('Male', '男性');
INSERT INTO gender (name_en, name_jp)
VALUES ('Female', '女性');
INSERT INTO gender (name_en, name_jp)
VALUES ('Prefer not to answer', '回答なし');

-- CREATE RATING TABLE
CREATE TABLE rating
(
    id      BIGSERIAL PRIMARY KEY NOT NULL,
    name_en TEXT                  NOT NULL,
    name_jp TEXT                  NOT NULL
);

INSERT INTO rating (name_en, name_jp)
VALUES ('Unacceptable', '不満');
INSERT INTO rating (name_en, name_jp)
VALUES ('Poor', 'やや不満');
INSERT INTO rating (name_en, name_jp)
VALUES ('Adequate', '普通');
INSERT INTO rating (name_en, name_jp)
VALUES ('Good', 'やや満足');
INSERT INTO rating (name_en, name_jp)
VALUES ('Excellent', '満足');
INSERT INTO rating (name_en, name_jp)
VALUES ('N/A', '非該当');


-- CREATE QUESTION CATEGORY TABLE
CREATE TABLE question_category
(
    id          BIGSERIAL PRIMARY KEY NOT NULL,
    survey_id   BIGINT                NOT NULL REFERENCES survey,
    category_en TEXT                  NOT NULL,
    category_jp TEXT                  NOT NUll
);

INSERT INTO question_category (survey_id, category_en, category_jp)
VALUES (1, 'Overall Cruise Evaluation', '航海全般');
INSERT INTO question_category (survey_id, category_en, category_jp)
VALUES (1, 'Cruise Safety', '航海の安全性');
INSERT INTO question_category (survey_id, category_en, category_jp)
VALUES (1, 'Cruise Support During The Planning Stage', '航海準備段階での支援');
INSERT INTO question_category (survey_id, category_en, category_jp)
VALUES (1, 'Onboard Research and Survey Equipment', '船上観測機器、研究設備');
INSERT INTO question_category (survey_id, category_en, category_jp)
VALUES (1, 'Onboard Network', '船内ネットワーク環境');
INSERT INTO question_category (survey_id, category_en, category_jp)
VALUES (1, 'Life Onboard', '船内生活');
INSERT INTO question_category (survey_id, category_en, category_jp)
VALUES (1, 'Onboard Research Support', '船上での研究支援');

-- CREATE QUESTION TABLE
CREATE TABLE question
(
    id                   BIGSERIAL PRIMARY KEY NOT NULL,
    question_category_id BIGINT                NOT NULL REFERENCES question_category,
    question_en          TEXT                  NOT NULL,
    question_jp          TEXT                  NOT NULL,
    is_rating            BOOLEAN               NOT NULL,
    is_comment           BOOLEAN               NOT NULL
);

INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (1, '2-1. How would you rate the success of this cruise in general?', '2-1. 全般を通じて本航海をどのように評価しますか？',
        true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (1, '2-2. Were you able to collect the samples/data needed for the research targets of this cruise?',
        '2-2. 本航海の目的に必要なサンプル/データは取得できましたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (1,
        '2-3. How would you rank the quality of the communication with MarE3, the ship crew, and lab techs before and during the cruise?',
        '2-3. 航海実施前・航海中を通じてMarE3、船員（運航チームを含む）、観測技術員とのコミュニケーションは十分でしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (1,
        '2-4. If you answered "Poor" or "Unacceptable" to any of the questions in this section, please tell us why. If you have any other comments or suggestions for improvements regarding the cruise in general, please add them here.',
        '2-4. 本セクション内の設問のいずれかで「やや不満」「不満」と答えられた方はその理由をお聞かせください。また、航海全般に関してのその他コメント、改善点等がございましたらご記入ください。',
        false, true);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (2,
        '3-1. Did you receive sufficient instructions onboard regarding safety for daily life and research activities during the cruise?',
        '3-1. 船内生活・活動の安全に関して、船上で受けた説明は十分でしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (2, '3-2. Did you receive sufficient instructions for emergency situations aboard?',
        '3-2. 緊急時対応について、船上で受けた説明は十分でしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (2, '3-3. Was the ship drill sufficient to understand proper evacuation routes and actions?',
        '3-3. 操練を通じて緊急時の待避経路等は十分に理解できましたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (2, '3-4. Did you ever experience or observe a dangerous situation on board?',
        '3-4. 乗船中に危険を感じる状況に直面したり、場面を見たりしたことはありましたか？', false, true);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (2, '3-5. For those who answered "Yes" to question 3-4: can you describe the details of each case?',
        '3-5. 3-4で「Yes」と答えた方へ、それはどのような状況でしたか？', false, true);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (2, '3-6. Was lab safety equipment (eye washers, spill kits, etc.) sufficient?',
        '3-6. 研究室の安全設備（アイウォッシャー、漏出処理具など）は十分でしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (2,
        '3-7. Was the safety equipment onboard (safety guards, evacuation signs, emergency equipment etc.) sufficient?',
        '3-7. 船内設備の安全性（安全策、ガードの配置場所や安全表示など）は適切かつ十分でしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (2, '3-8. Helmet', '3-8. ヘルメット', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (2, '3-8. Gloves', '3-8. 手袋', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (2, '3-8. Life Jacket', '3-8. 作業用ライフジャケット', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (2, '3-8. Safety Glasses', '3-8. 保護メガネ', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (2, '3-8. Safety Shoes', '3-8. 安全靴', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (2, '3-9. How would you rate the medical facilities and support aboard?',
        '3-9. 船内での衛生管理、医薬品提供等はいかがでしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (2, '3-10. How would you rate the measures against infectious disease transmission aboard?',
        '3-10. 船内での感染症への対策（消毒など）は適切だと感じましたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (2, '3-11. How would you rate the methods to control infectious disease before boarding?',
        '3-11. 乗船前の感染症対策は適切と感じましたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (2,
        '3-12. If you answered "Poor" or "Unacceptable" to any of the questions in this section, please tell us why. If you have any other comments or suggestions for improvements regarding the cruise safety, please add them here.',
        '3-12. 本セクション内の設問のいずれかで「やや不満」「不満」と答えられた方は、その理由をお聞かせください。また、航海の安全性について、その他コメントや改善点等ございましたらご記入ください。',
        false, true);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (3,
        '4-1. Was the content of the “User Guides” (https://www.jamstec.go.jp/mare3/j/boarding/guide_ship/) for the vessels or onboard equipment sufficient?',
        '4-1. 各種船舶・探査機・観測機器の「利用の手引き」の内容は十分でしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (3, '4-2. How would you rate the advance information provided about the onboard equipment and tools?',
        '4-2. そのほか船上での調査・観測設備に関する事前の情報提供は十分でしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (3,
        '4-3. How would you rate the information provided on “Life onboard” and the contents of the ship boarding guides?',
        '4-3. 船内生活に関する事前の情報提供は十分でしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (3,
        '4-4. How would you rate the information provided on logistics and loading/unloading baggage, equipment, etc?',
        '4-4. 荷役（艤装・艤装解除）に関する事前の情報提供は十分でしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (3, '4-5. How would you rate the information provided on port-call information, boarding guides, cabins, etc.?',
        '4-5. 乗船案内（乗下船地、居室等）関して、情報提供は十分でしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (3,
        '4-6. How would you rate the information provided by MarE3 regarding risk assessments and other safety measures before the cruise?',
        '4-6. 航海中の作業の安全対策について、MarE3との協議は十分かつ適切だと感じましたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (3, '4-7. How would you rate the pre-cruise information provided by MarE3?',
        '4-7. 航海前全体を通じてMarE3から提供された情報は役立ちましたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (3,
        '4-8. If you answered "Poor" or "Unacceptable" to any of the questions in this section, please tell us why. If you have any other comments or improvements for pre-cruise support in the cruise preparation stage, please add them here.',
        '4-8. 本セクション内の設問のいずれかで「やや不満」「不満」と答えられた方は、その理由をお聞かせください。また、航海準備段階での支援について、その他コメントや改善点等ございましたらご記入ください。',
        false, true);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (3,
        '4-9. For the PI: Was MarE3 support, from the proposal submission stage to the cruise implementation stage, sufficient? If you have any comments regarding suggestions for improvement, please add them here.',
        '4-9. 主席/首席研究者の方へ　課題提案から航海実施に至るまでのMarE3の支援は十分でしたか？コメントや改善点等があればご記入ください。', false,
        true);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-1. How would you rate the lab power supply (capacity and availability of outlets, etc.)?',
        '5-1. 研究室の供給電源の使い勝手（位置や容量など）はいかがでしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-2. How would you rate the laboratory layout and equipment (tables, chairs, hoods, etc.)?',
        '5-2. 研究室の固定具の位置や数は十分でしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-3. How would you rate the lighting in the onboard labs?', '5-3. 研究室の明るさは十分でしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-4. MBES', '5-4. MBES', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-4. SBP', '5-4. SBP', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-4. XBT/XCTD', '5-4. XBT/XCTD', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-4. PDR', '5-4. PDR', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-4. ADCP', '5-4. ADCP', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-4. Doppler Radar', '5-4. ドップラーレーダ', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-4. Gravitometer', '5-4. 重力計', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-4. Magnetometer', '5-4. 磁力計', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-4. Fish Finder', '5-4. 計量魚群探知機', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-4. Weather Monitor', '5-4. 気象観測装置', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-5. Shinkai 6500', '5-5. しんかい6500', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-5. Kaiko', '5-5. かいこう', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-5. Hyper-dolphin', '5-5. ハイパードルフィン', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-5. KM-ROV', '5-5. KM-ROV', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-5. Deep Tow', '5-5. ディープ・トウ', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-5. YKDT', '5-5. YKDT', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-5. Urashima AUV', '5-5. うらしま', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-5. Jimbei AUV', '5-5. じんべい', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-5. OBS', '5-5. OBS', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-5. SCS', '5-5. SCS', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-5. MCS', '5-5. MCS', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-5. Water Sampling', '5-5. 採水システム', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-5. CTD', '5-5. CTDシステム', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-5. Normal Piston Coring', '5-5. ピストンコアラ', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-5. Dredge', '5-5. ドレッジ', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-5. Power Grab', '5-5. パワーグラブ', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-5. BMS', '5-5. BMS', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4, '5-5. GPC', '5-5. GPC', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (4,
        '5-6. If you answered "Poor" or "Unacceptable" to any of the questions in this section, please tell us why. If you have any other comments or improvements for onboard observation and research equipment, please add them here.',
        '5-6. 本セクション内の設問のいずれかで「やや不満」「不満」と答えられた方は、その理由をお聞かせください。また、船上観測機器・研究設備ついて、その他コメントや改善点等ございましたらご記入ください。',
        false, true);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (5, '6-1. Shinkai 6500 operation', '6-1. しんかい6500の運用', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (5, '6-1. ROV operation', '6-1. ROVの運用', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (5, '6-1. AUV operation', '6-1. AUVの運用', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (5, '6-1. Deep Tow operation', '6-1. ディープ・トウの運用', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (5, '6-1. SCS, MCS operation', '6-1. SCS、MCSの運用', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (5, '6-1. OBS operation', '6-1. OBSの運用', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (5, '6-1. Water sampling operation', '6-1. 採水機器の運用', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (5, '6-1. Sediment sampling operation', '6-1. 採泥機器の運用', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (5, '6-1. Non-fixed vessel analytical tools or sampler (lab analyzers, etc) equipment operation',
        '6-1. 船体非固定観測機器（海洋物理観測機器、分析装置など）の運用', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (5, '6-1. Fixed vessel measurement (MBES, ADCP, etc.) equipment operation',
        '6-1. 船体固定観測機器（MBES、ADCPなど）の運用', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (5, '6-2. How would you rate the support from the ship''s crew?', '6-2. 本船クルーからの研究支援はいかがでしたか？', true,
        false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (5,
        '6-3. If you answered "Poor" or "Unacceptable" to any of the questions in this section, please tell us why. If you have any other comments or improvements for onboard research support during the cruise, please add them here. ',
        '6-3. 本セクション内の設問のいずれかで「やや不満」「不満」と答えられた方は、その理由をお聞かせください。また、船上での研究支援ついて、その他コメントや改善点等ございましたらご記入ください。',
        false, true);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (6, '7-1. How would you rate the speed and connectivity of the onboard network?',
        '7-1. 船内ネットワークの使い勝手はいかがでしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (6, '7-2. How would you rate the instructions to connect to the onboard network?',
        '7-2. ネットワーク設定方法に関する情報提供は十分でしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (6, '7-3. How would you rate the onboard email system?', '7-3. 船上Emailの使い勝手はいかがでしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (6,
        '7-4. How would you rate the accessibility of the onboard observation data (i.e. could you easily find, access, and download the data)?',
        '7-4. 船上でのデータ提供について、観測データへのアクセスは容易でしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (6, '7-5. How would you rate the onboard network in accessing required data, when you needed it?',
        '7-5.船上でのデータ提供について、必要なデータに必要なタイミングでアクセスできましたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (6,
        '7-6. If you answered "Poor" or "Unacceptable" to any of the questions in this section, please tell us why. If you have any other comments or improvements for the onboard network during the cruise, please add them here. ',
        '7-6. 本セクション内の設問のいずれかで「やや不満」「不満」と答えられた方は、その理由をお聞かせください。また、船内ネットワーク環境や船上でのデータ提供ついて、その他コメントや改善点等ございましたらご記入ください。',
        false, true);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (7, '8-1. How would you rate the cleanliness of your cabin and other public spaces onboard?',
        '8-1. 居室や清掃用具の設備は十分でしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (7, '8-2. How would you rate the common facilities (restrooms, showers, laundry room, etc.)?',
        '8-2. 船内共用設備（お手洗い、浴室、洗濯室など）の使い勝手はいかがでしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (7, '8-3. How would you rate the meals onboard?', '8-3. 食事の提供内容についてはいかがでしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (7, '8-4. How would you rate the onboard dining facilities?', '8-4. 食堂設備などについてはいかがでしたか？', true, false);
INSERT INTO question (question_category_id, question_en, question_jp, is_rating, is_comment)
VALUES (7,
        '8-5. If you answered "Poor" or "Unacceptable" to any of the questions in this section, please tell us why. If you have any other comments or improvements for life onboard during the cruise, please add them here. Thanks very much for filling out and submitting this evaluation. ',
        '8-5. 本セクション内の設問のいずれかで「やや不満」「不満」と答えられた方は、その理由をお聞かせください。また、船内生活について、その他コメントや改善点等ございましたらご記入ください。',
        false, true);

-- CREATE RESPONDER TABLE
CREATE TABLE responder (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    cruise_id BIGINT REFERENCES cruise,
    submission_date DATE NOT NULL,
    name_jp TEXT NOT NULL,
    name_en TEXT NOT NULL,
    email TEXT NOT NULL,
    career_level_id BIGINT REFERENCES career_level,
    affiliation TEXT NOT NULL,
    gender_id BIGINT REFERENCES gender,
    age_group_id BIGINT REFERENCES age_group,
    nationality TEXT NOT NULL,
    jamstec_experience BOOLEAN NOT NULL,
    other_experience BOOLEAN NOT NULL
);

-- CREATE RESPONSE TABLE
CREATE TABLE response (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    responder_id BIGINT REFERENCES responder,
    question_id BIGINT REFERENCES question,
    rating_id BIGINT REFERENCES rating,
    response_comment TEXT,
    cruise_id BIGINT REFERENCES cruise
);

-- CREATE RESEARCHER TABLE
CREATE TABLE researcher (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    cruise_id BIGINT REFERENCES cruise,
    vessel_id BIGINT REFERENCES vessel,
    researcher_name TEXT NOT NULL,
    affiliation TEXT,
    career_level TEXT,
    university_name_en TEXT,
    university_name_jp TEXT
);