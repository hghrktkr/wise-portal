export interface LessonData {
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
    value: string;  // MarkDown
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
    question: Question[];
}

interface Question {
    id: string;
    questionSentence?: string;   // Markdown
    choices: {id: string, label: string}[];
    answer: string[];
    answerType: 'single' | 'multiple';
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
                            value: `
**変数**には、下のような特性とくせいがありました。もう一度復習しましょう！
* 変数は、後から数字を入れたり変えたりできる。
* 変数には、くりかえす回数や、X座標ざひょうY座標などの数字、座標そのものも入れることができる。
* 変数はループや条件分岐と組み合わせることができる。

今回は、これまでの総復習として、変数に数字やブロックの種類、座標を入れてみよう！
`
                        }
                    ],
                    needsAnswer: false
                },
                {
                    id: 'content_i2',
                    body: [
                        {
                            id: 'lesson1-phase1-content2-text1',
                            kind: 'text',
                            value: `
## 変数を基準きじゅんにしてブロックを並べる方法

ポジションにある **(~0, ~0, ~0) + (~0, ~0, ~0)** を使って、左のように組み合わせると、変数に入った座標を基準にしてブロックを並べることができます。

このように、変数を使うことで、プレイヤーが別の場所にいても、指定した位置を中心にして、相対そうたい座標を使うことができます。
`
                        },
                        {
                            id: 'lesson1-phase1-content2-image1',
                            kind: 'image',
                            src: 'https://vcode-esia.com/images_for_world_data/Basic/Theme4/Lesson5/L5_image03.png',
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
                            value: `
## 変数に入った座標を動かす方法

変数は、**後から数字を入れたり変えたりすることができる**という機能がありました。
変数に座標を入れたときも、(~0, ~0, ~0) + (~0, ~0, ~0)を使えば、後から座標を変えることができます！
`
                        },
                        {
                            id: 'lesson1-phase1-content3-image1',
                            kind: 'image',
                            src: 'https://vcode-esia.com/images_for_world_data/Basic/Theme4/Lesson5/L5_image04.png',
                            alt: 'テスト画像ダミー2'
                        }
                    ],
                    needsAnswer: false
                },
                {
                    id: 'content_i4',
                    body: [
                        {
                            id: 'lesson1-phase1-content4-image1',
                            kind: 'image',
                            src: 'https://vcode-esia.com/images_for_world_data/Basic/Theme4/Lesson5/L5_image05.png',
                            alt: 'テスト画像ダミー3'
                        },
                        {
                            id: 'lesson1-phase1-content4-text1',
                            kind: 'text',
                            value: `
## 問題①　変数を使って、フェンスや生き物を出そう！

3種類しゅるいのフェンスと生き物を出そう

* オークのフェンスの中に牛を5頭スポーンさせる
* アカシアのフェンスの中にブタを7ひきスポーンさせる
* トウヒのフェンスの中にニワトリを10羽スポーンさせる
* フェンスの大きさは、東に5ブロック、南に11ブロック

条件分岐じょうけんぶんきを使って、 **run ○(○は0～2の数字)** と入力したときに、えらんだ数字によって違うフェンスや生き物がスポーンするようにしよう！`
                        }
                    ],
                    needsAnswer: false
                },
                {
                    id: 'content_i5',
                    body: [
                        {
                            id: 'lesson1-phase1-content5-image1',
                            kind: 'image',
                            src: 'https://vcode-esia.com/images_for_world_data/Basic/Theme4/Lesson5/L5_image06.png',
                            alt: 'テスト画像ダミー4'
                        },
                        {
                            id: 'lesson1-phase1-content5-text1',
                            kind: 'text',
                            value: `
## 問題②　畑はたけを作ろう！

- 東に9ブロック南に9ブロックの畑を2つつくる
- 畑がかわかないように、畑の真ん中に水をおく
- 白色の彩釉さいゆうテラコッタに近いほうの畑(画像がぞうの左側)には、小麦を植える
- もうひとつの畑(画像の右側)には、ニンジンを植える

変数「開始位置」を動かして、2か所に畑をならべよう！`
                        }
                    ],
                    needsAnswer: false
                },
                {
                    id: 'content_i6',
                    body: [
                        {
                            id: 'lesson1-phase1-content6-image1',
                            kind: 'image',
                            src: 'https://vcode-esia.com/images_for_world_data/Basic/Theme4/Lesson5/L5_image07.png',
                            alt: 'テスト画像ダミー5'
                        },
                        {
                            id: 'lesson1-phase1-content5-text1',
                            kind: 'text',
                            value: `
## 問題③　小麦の俵たわらをならべよう！

- ワールド(137, 63, -341)からワールド(145, 63, -337)の範囲はんいに小麦の俵を並べる
- 小麦の俵は3ブロックの高さだけつみあげる
- ピラミッドのように、上の段ほどたてと横の大きさが小さくなるようにする

変数「範囲の始まり」「範囲の終わり」に入った座標を動かして、ブロックをつみかさねよう！`
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
                    id: 'content_i7',
                    body: [
                        {
                            id: 'lesson1-phase2-content1-image1',
                            kind: 'image',
                            src: 'https://vcode-esia.com/images_for_world_data/Basic/Theme3/Lesson10/L10_image01.gif',
                            alt: 'テスト画像ダミー'
                        },
                        {
                            id: 'lesson1-phase2-content1-text1',
                            kind: 'text',
                            value: `
# 今回のテーマ
## カートゲームを作ろう！
 

## 今回学習すること
- 復習：真理値しんりち
- タイマーの作り方
                            `
                        }
                    ],
                    needsAnswer: false
                },
                {
                    id: 'content_i8',
                    body: [
                        {
                            id: 'lesson1-phase2-content2-image1',
                            kind: 'image',
                            src: 'https://vcode-esia.com/images_for_world_data/Basic/Theme3/Lesson10/L10_image02.png',
                            alt: 'テスト画像ダミー'
                        },
                        {
                            id: 'lesson1-phase2-content2-text1',
                            kind: 'text',
                            value: `
## カートレースを作ろう！・・・

今回は、これまでに学習したことを復習しながら、レーシングカートで1周のタイムを競うきそゲームを作ろう！
                            `
                        },
                    ],
                    needsAnswer: false
                },
                {
                    id: 'content_i9',
                    body: [
                        {
                            id: 'lesson1-phase2-content3-text1',
                            kind: 'text',
                            value: `
## 復習：真理値とは・・・

**真理値**とは、変数に入れられるもののひとつで **「はい(真しん)」か「いいえ(偽ぎ)」の状態じょうたいを表すもの** のことです。

今回は、変数スイッチをつくり、プレイヤーがレース中かどうかを調べられるようにしましょう！

- スイッチ = 真：プレイヤーがレース中
- スイッチ = 偽：プレイヤーがレース中でない

こうすることで、プレイヤーがレース中のときだけ仕組みを動かすことができるようになります！
                            `
                        },
                        {
                            id: 'lesson1-phase2-content3-image1',
                            kind: 'image',
                            src: 'https://vcode-esia.com/images_for_world_data/Basic/Theme3/Lesson10/L10_image03.gif',
                            alt: 'テスト画像ダミー'
                        }
                    ],
                    needsAnswer: false
                },
                {
                    id: 'content_i10',
                    body: [
                        {
                            id: 'lesson1-phase2-content4-text1',
                            kind: 'text',
                            value: `
## 真理値とループの組み合わせ・・・

真理値を使って、 **ゲーム中だけ仕組みを動かすプログラミング** を見てみましょう！

- チャットコマンドrunを入力したときに、変数スイッチの真理値を真にする
- チャットコマンドjump、チャットコマンドeffectを実行する
- 変数スイッチの真理値が真なら、チャットコマンドjump、チャットコマンドeffectをループして実行する
- レースが終わるときに変数スイッチの真理値を偽にする

こうすることで、レース中だけチャットコマンドを実行することができます！
                            `
                        },
                        {
                            id: 'lesson1-phase2-content4-image1',
                            kind: 'image',
                            src: 'https://vcode-esia.com/images_for_world_data/Basic/Theme3/Lesson10/L10_image04.png',
                            alt: 'テスト画像ダミー'
                        }
                    ],
                    needsAnswer: false
                },
                {
                    id: 'content_i11',
                    body: [
                        {
                            id: 'lesson1-phase2-content5-text1',
                            kind: 'text',
                            value: `
## タイマーの作り方・・・

プログラミングでゲームを作るときに、制限せいげん時間を作ることができるとゲームが面白くなります！

今回のレースゲームでも、レースのタイムを計るようにして、何度も挑戦ちょうせんしたくなるようなゲームにしましょう！

タイマーの仕組みは、 **変数とループを組み合わせる** と作ることができます。

- 変数タイマーを作り、かかった時間を入れられるようにする
- 1秒(1000ミリ秒)待つ⇒変数タイマーに入った数字を1ふやす
- 真理値が真のあいだ、ループさせる

プログラムはシンプルですが、いろいろな時に使える仕組みなので、ぜひ覚えておきましょう！
                            `
                        },
                        {
                            id: 'lesson1-phase2-content5-image1',
                            kind: 'image',
                            src: 'https://vcode-esia.com/images_for_world_data/Basic/Theme3/Lesson10/L10_image05.png',
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
                            id: 'lesson1-phase3-content1-image1',
                            kind: 'image',
                            src: 'https://k-esia.com/images/4th_lesson5_q1_v100.png',
                            alt: 'テスト画像ダミー'
                        },
                        {
                            id: 'lesson1-phase3-content1-exercise1',
                            kind: 'exercise',
                            question: [
                                {
                                    id: 'e1-q1',
                                    questionSentence: `
左のプログラムを実行してチャットで **run 2** と入力すると、変数 **生き物の数** には何が入りますか？
                                    `,
                                    choices: [
                                        {id: 'choice_1', label: '10'},
                                        {id: 'choice_2', label: '5'},
                                        {id: 'choice_3', label: 'アカシアのフェンス'},
                                        {id: 'choice_4', label: 'トウヒのフェンス'}
                                    ],
                                    answer: ['choice_1'],
                                    answerType: 'single'
                                },
                                
                            ]
                        }
                    ],
                    needsAnswer: true
                },
                {
                    id: 'content_e2',
                    body: [
                        {
                            id: 'lesson1-phase3-content2-image1',
                            kind: 'image',
                            src: 'https://vcode-esia.com/images_for_world_data/Basic/Theme4/Lesson5/L5_image07.png',
                            alt: 'テスト画像ダミー5'
                        },
                        {
                            id: 'lesson1-phase3-content2-exercise1',
                            kind: 'exercise',
                            question: [
                                {
                                    id: 'e2-q1',
                                    questionSentence: `
変数 **開始位置** の座標を基準(きじゅん)にして、画像のような形の畑をプログラミングで作ろうと思います。

正しいプログラムの流れになるように、下の文の①～④に当てはまる言葉をえらびましょう。

- **①**を東と南に **②** から **③** までならべる
- **④**を同じ大きさでならべる

①にあてはまる言葉
                                    `,
                                    choices: [
                                        {id: 'choice_1', label: '小麦'},
                                        {id: 'choice_2', label: '耕地(こうち)'}
                                    ],
                                    answer: ['choice_2'],
                                    answerType: 'single'
                                },
                                {
                                    id: 'e2-q2',
                                    questionSentence: `
②にあてはまる言葉
                                    `,
                                    choices: [
                                        {id: 'choice_1', label: '0'},
                                        {id: 'choice_2', label: '1'},
                                        {id: 'choice_3', label: '8'},
                                        {id: 'choice_4', label: '9'}
                                    ],
                                    answer: ['choice_2'],
                                    answerType: 'single'
                                },
                                {
                                    id: 'e2-q3',
                                    questionSentence: `
③にあてはまる言葉
                                    `,
                                    choices: [
                                        {id: 'choice_1', label: '0'},
                                        {id: 'choice_2', label: '1'},
                                        {id: 'choice_3', label: '8'},
                                        {id: 'choice_4', label: '9'}
                                    ],
                                    answer: ['choice_4'],
                                    answerType: 'single'
                                },
                                {
                                    id: 'e2-q4',
                                    questionSentence: `
④にあてはまる言葉
                                    `,
                                    choices: [
                                        {id: 'choice_1', label: '小麦'},
                                        {id: 'choice_2', label: '耕地(こうち)'}
                                    ],
                                    answer: ['choice_1'],
                                    answerType: 'single'
                                }
                            ]
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
                            question: [
                                {
                                    id: 'e3-q1',
                                    questionSentence: `
今回プログラミングでスポーンさせる生き物を **すべて** えらびましょう。
                                    `,
                                    choices: [
                                        {id: 'choice_1', label: 'ウシ'},
                                        {id: 'choice_2', label: 'ブタ'},
                                        {id: 'choice_3', label: 'ヤギ'},
                                        {id: 'choice_4', label: 'ニワトリ'}
                                    ],
                                    answer: ['choice_1', 'choice_2', 'choice_4'],
                                    answerType: 'multiple'
                                },   
                            ]
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