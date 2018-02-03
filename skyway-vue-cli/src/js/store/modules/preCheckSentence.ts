const state = {
  sentences: [
    {
      jp_text: 'もう少しゆっくり話してもらえますか?',
      en_text: 'Could you speak more slowly?',
      pronunciation: 'クドゥ ユー スピーク モア スローリー?'
    },
    {
      jp_text: '声は聞こえますか?',
      en_text: 'Can you hear me?',
      pronunciation: 'キャン ユー ヒア ミー?'
    },
    {
      jp_text: '今日は_レッスンがしたいです。',
      en_text: 'I would like to have __ lesson today.',
      pronunciation: 'アイ ウッド ライク トゥ ハブ _ レッスン トゥデイ .'
    },
    {
      jp_text: 'ヒントを教えてください。',
      en_text: 'Please give me some hints.',
      pronunciation: 'プリーズ ギブ ミー サム ヒンツ .'
    },
    {
      jp_text: 'ちょっと考えさせてください。',
      en_text: 'Let me think about it.',
      pronunciation: 'レット ミー シンク アバウト イット .'
    },
    {
      jp_text: 'チャットボックスは見られますか?',
      en_text: 'Can you see the chat box?',
      pronunciation: 'キャン ユー シー ザ チャットボックス?'
    },
    {
      jp_text: 'チャットボックスに書いてください。',
      en_text: 'Please type it down in the chat box.',
      pronunciation: 'プリーズ タイプ イット ダウン イン ザ チャットボックス .'
    },
    {
      jp_text: 'どういう意味ですか?',
      en_text: 'What do you mean?',
      pronunciation: 'ワット ドゥ ユー ミーン?'
    },
    {
      jp_text: 'もう一度言ってください。',
      en_text: 'Please say it again.',
      pronunciation: 'プリーズ セイ イット アゲイン .'
    },
    {
      jp_text: 'ちょっと待ってください。',
      en_text: 'Please wait for a moment.',
      pronunciation: 'プリーズ ウェイト フォ ア モーメント'
    }
  ]
}

const getters = {
  getSentenceAtRandom: (state): {} => {
    const min: number = 0
    const max: number = state.sentences.length - 1
    return state.sentences[Math.floor(Math.random() * (max - min + 1)) + min]
  }
}
const actions = {}
const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
