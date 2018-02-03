const state = {
  // tabs are: trouble | useful | lesson
  currentTab: 'trouble',

  tabs: {
    trouble: {
      name: '自己紹介に',
      phrases: [
        {
          jp_text: '私の名前は __ です。',
          en_text: 'My name is __ .',
          jp_pronunciation: 'マイ ネイム イズ __ .'
        },
        {
          jp_text: '__ と呼んでください。',
          en_text: 'Please call me __ .',
          jp_pronunciation: 'プリーズ コール ミー __ .'
        },
        {
          jp_text: '私は __ に住んでいます。',
          en_text: 'I live in __ .',
          jp_pronunciation: 'アイ リブ イン __ .'
        },
        {
          jp_text: '私の仕事は __ です。',
          en_text: 'My job is __ .',
          jp_pronunciation: 'マイ ジョブ イズ __ .'
        },
        {
          jp_text: '私の趣味は __ です。',
          en_text: 'My hobby is __ .',
          jp_pronunciation: 'マイ ホビー イズ __ .'
        },
        {
          jp_text: '私の専攻は __ です。',
          en_text: 'My major is __ .',
          jp_pronunciation: 'マイ メジャー イズ __ .'
        },
        {
          jp_text: '私は現在 __ 才です。',
          en_text: 'I am __ years old right now.',
          jp_pronunciation: 'アイ アム __ イヤーズ オールド ライト ナウ .'
        }
      ]
    },
    useful: {
      name: '会話に困ったら',
      phrases: [
        {
          jp_text: 'もう少しゆっくり話してもらえますか?',
          en_text: 'Could you speak more slowly?',
          jp_pronunciation: 'クドゥ ユー スピーク モア スローリー?'
        },
        {
          jp_text: '声は聞こえますか?',
          en_text: 'Can you hear me?',
          jp_pronunciation: 'キャン ユー ヒア ミー?'
        },
        {
          jp_text: '今日は _ レッスンがしたいです。',
          en_text: 'I would like to have __ lesson today.',
          jp_pronunciation: 'アイ ウッド ライク トゥ ハブ _ レッスン トゥデイ .'
        },
        {
          jp_text: 'ヒントを教えてください。',
          en_text: 'Please give me some hints.',
          jp_pronunciation: 'プリーズ ギブ ミー サム ヒンツ .'
        },
        {
          jp_text: 'ちょっと考えさせてください。',
          en_text: 'Let me think about it.',
          jp_pronunciation: 'レット ミー シンク アバウト イット .'
        },
        {
          jp_text: 'チャットボックスは見られますか?',
          en_text: 'Can you see the chat box?',
          jp_pronunciation: 'キャン ユー シー ザ チャットボックス?'
        },
        {
          jp_text: 'チャットボックスに書いてください。',
          en_text: 'Please type it down in the chat box.',
          jp_pronunciation:
            'プリーズ タイプ イット ダウン イン ザ チャットボックス .'
        },
        {
          jp_text: 'どういう意味ですか?',
          en_text: 'What do you mean?',
          jp_pronunciation: 'ワット ドゥ ユー ミーン?'
        },
        {
          jp_text: 'もう一度言ってください。',
          en_text: 'Please say it again.',
          jp_pronunciation: 'プリーズ セイ イット アゲイン .'
        },
        {
          jp_text: 'ちょっと待ってください。',
          en_text: 'Please wait for a moment.',
          jp_pronunciation: 'プリーズ ウェイト フォ ア モーメント .'
        }
      ]
    },
    lesson: {
      name: 'トラブル時に',
      phrases: [
        {
          jp_text: '音声が聞こえません。',
          en_text: 'Sorry, I can\'t hear your voice.',
          jp_pronunciation: 'ソーリー アイ キャノット ヒアー ユア ボイス .'
        },
        {
          jp_text: '音声が途切れて聞こえます。',
          en_text: 'The sound is breaking up.',
          jp_pronunciation: 'ザ サウンド イズ ブレイキング アップ .'
        },
        {
          jp_text: '回線の調子が悪いようです。',
          en_text: 'I think we have a bad connection.',
          jp_pronunciation: 'アイ シンク ウィー ハブ ア バッド コネクション .'
        },
        {
          jp_text: '教材が開けません。',
          en_text: 'I cannot open the material.',
          jp_pronunciation: 'アイ キャノット オープン ザ マテリアル .'
        },
        {
          jp_text: '電池が切れそうです。',
          en_text: 'My PC battery is going to run out pretty soon.',
          jp_pronunciation:
            'マイ ピーシー バッテリー イズ ゴーイング トゥ ランアウト プリティ スーン .'
        },
        {
          jp_text: 'パソコンを再起動しないとダメみたいです。',
          en_text: 'I have to reboot my PC.',
          jp_pronunciation: 'アイ ハフ トゥ リブート マイ ピーシー .'
        }
      ]
    }
  }
}

const getters = {
  currentTab: state => state.currentTab,
  tabs: state => state.tabs
}

const actions = {
  updateCurrentTab ({ commit }, tab: string): void {
    commit('setCurrentTab', { tab })
  }
}

const mutations = {
  setCurrentTab (state, payload): void {
    state.currentTab = payload.tab
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
