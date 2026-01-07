interface LessonData {
    id: string;
    title: string;
    description: string;
    phases: PhaseData[];
}

export interface PhaseData {
    id: string;
    type: 'instruction' | 'exercise' | 'feedback';
    orderIndex: number;
    contents: ContentData[];
}

export interface ContentData {
    id: string;
    body: ContentBlock[];
    needsAnswer: boolean;
}

export interface TextBlock {
    id: string;
    kind: 'text';
    value: string;
}

export interface ImageBlock {
    id: string;
    kind: 'image';
    src: string;
    alt?: string;
}

export interface ExerciseBlock {
    id: string;
    kind: 'exercise';
    question: string;
    choices: { id: string, label: string}[];
    answerType: 'single' | 'multiple';
    correctAnswer: string | string[];
}

export type ContentBlock = TextBlock | ImageBlock | ExerciseBlock;



export const DUMMY_LESSON: LessonData = {
    id: 'lesson_test',
    title: 'テストレッスンタイトル',
    description: 'ここにレッスンの学習内容や目標を記載する。',
    phases: [
        {
            id: 'phase_1',
            type: 'instruction',
            orderIndex: 1,
            contents: [
                {
                    id: 'content_i1',
                    body: [
                        {
                            id: 'lesson1-phase1-content1-text1',
                            kind: 'text',
                            value: '変数には、下のような特性とくせいがありました。もう一度復習しましょう！変数は、後から数字を入れたり変えたりできる。変数には、くりかえす回数や、X座標ざひょうY座標などの数字、座標そのものも入れることができる。変数はループや条件分岐と組み合わせることができる。今回は、これまでの総復習として、変数に数字やブロックの種類、座標を入れてみよう！'
                        }
                    ],
                    needsAnswer: false
                },
                {
                    id: 'content_i2',
                    body: [
                        {
                            id: 'lesson1-phase1-content2-image1',
                            kind: 'image',
                            src: '/images/lesson/example.png',
                            alt: 'テスト画像ダミー1'
                        }
                    ],
                    needsAnswer: false
                },
                {
                    id: 'content_i3',
                    body: [
                        {
                            id: 'lesson1-phase1-content3-text1',
                            kind: 'text',
                            value: '変数を基準きじゅんにしてブロックを並べる方法・・・ポジションにある(~0, ~0, ~0) + (~0, ~0, ~0)を使って、左のように組み合わせると、変数に入った座標を基準にしてブロックを並べることができます。このように、変数を使うことで、プレイヤーが別の場所にいても、指定した位置を中心にして、相対そうたい座標を使うことができます。'
                        },
                        {
                            id: 'lesson1-phase1-content3-image1',
                            kind: 'image',
                            src: 'https://vcode-esia.com/images_for_world_data/Basic/Theme4/Lesson5/L5_image03.png',
                            alt: 'テスト画像ダミー2'
                        }
                    ],
                    needsAnswer: false
                }
            ]
        },
        {
            id: 'phase_2',
            type: 'instruction',
            orderIndex: 2,
            contents: [
                {
                    id: 'content_i4',
                    body: [
                        {
                            id: 'lesson1-phase2-content1-text1',
                            kind: 'text',
                            value: 'instructionテストデータ1(文面のみ)'
                        }
                    ],
                    needsAnswer: false
                },
                {
                    id: 'content_i5',
                    body: [
                        {
                            id: 'lesson1-phase2-content2-image1',
                            kind: 'image',
                            src: '/images/lesson/example.png',
                            alt: 'テスト画像ダミー'
                        }
                    ],
                    needsAnswer: false
                },
                {
                    id: 'content_i6',
                    body: [
                        {
                            id: 'lesson1-phase2-content3-text1',
                            kind: 'text',
                            value: 'instructionテストデータ1(文面と画像)'
                        },
                        {
                            id: 'lesson1-phase2-content3-image1',
                            kind: 'image',
                            src: '/images/lesson/example.png',
                            alt: 'テスト画像ダミー'
                        }
                    ],
                    needsAnswer: false
                }
            ]
        },
        {
            id: 'phase_3',
            type: 'exercise',
            orderIndex: 3,
            contents: [
                {
                    id: 'content_e1',
                    body: [
                        {
                            id: 'lesson1-phase3-content1-exercise1',
                            kind: 'exercise',
                            question: 'ダミー問題①(シングル・文面のみ)',
                            choices: [
                                {id: 'choice_1', label: '選択肢1'},
                                {id: 'choice_2', label: '選択肢2'},
                                {id: 'choice_3', label: '選択肢3'}
                            ],
                            answerType: 'single',
                            correctAnswer: 'choice_1'
                        }
                    ],
                    needsAnswer: true
                },
                {
                    id: 'content_e2',
                    body: [
                        {
                            id: 'lesson1-phase3-content2-exercise1',
                            kind: 'exercise',
                            question: 'ダミー問題②(複数選択・文面のみ)',
                            choices: [
                                {id: 'choice_1', label: '選択肢1'},
                                {id: 'choice_2', label: '選択肢2'},
                                {id: 'choice_3', label: '選択肢3'}
                            ],
                            answerType: 'multiple',
                            correctAnswer: ['choice_2', 'choice_3']
                        }
                    ],
                    needsAnswer: true
                },
                {
                    id: 'content_e3',
                    body: [
                        {
                            id: 'lesson1-phase3-content3-exercise1',
                            kind: 'exercise',
                            question: 'ダミー問題③(シングル・画像あり)',
                            choices: [
                                {id: 'choice_1', label: '選択肢1'},
                                {id: 'choice_2', label: '選択肢2'},
                                {id: 'choice_3', label: '選択肢3'}
                            ],
                            answerType: 'single',
                            correctAnswer: 'choice_2'
                        },
                        {
                            id: 'lesson1-phase3-content3-image1',
                            kind: 'image',
                            src: '/images/lesson/example.png',
                            alt: 'テスト画像ダミー'
                        }
                    ],
                    needsAnswer: true
                }
            ]
        },
        {
            id: 'phase_4',
            type: 'feedback',
            orderIndex: 4,
            contents: [
                {
                    id: 'content_f1',
                    body: [
                        {
                            id: 'lesson1-phase4-content1-feedback1',
                            kind: 'text',
                            value: 'このレッスンの感想を入力してください。'
                        }
                    ],
                    needsAnswer: true
                }
            ]
        }
    ]
}