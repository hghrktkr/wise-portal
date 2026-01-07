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

interface ContentData {
    id: string;
    body: ContentBlock[];
    needsAnswer: boolean;
}

interface TextBlock {
    kind: 'text';
    value: string;
}

interface ImageBlock {
    kind: 'image';
    src: string;
    alt?: string;
}

interface ExerciseBlock {
    kind: 'exercise';
    question: string;
    choices: { id: string, label: string}[];
    answerType: 'single' | 'multiple';
    correctAnswer: string | string[];
}

type ContentBlock = TextBlock | ImageBlock | ExerciseBlock;



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
                            kind: 'text',
                            value: 'instructionテストデータ1(文面のみ)'
                        }
                    ],
                    needsAnswer: false
                },
                {
                    id: 'content_i2',
                    body: [
                        {
                            kind: 'image',
                            src: '/images/lesson/example.png',
                            alt: 'テスト画像ダミー'
                        }
                    ],
                    needsAnswer: false
                },
                {
                    id: 'content_i3',
                    body: [
                        {
                            kind: 'text',
                            value: 'instructionテストデータ1(文面と画像)'
                        },
                        {
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
            id: 'phase_2',
            type: 'instruction',
            orderIndex: 2,
            contents: [
                {
                    id: 'content_i4',
                    body: [
                        {
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
                            kind: 'text',
                            value: 'instructionテストデータ1(文面と画像)'
                        },
                        {
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