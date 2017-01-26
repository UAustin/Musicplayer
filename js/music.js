var audio = e('#id-audio-player')
var playButton = e('#id-play-button')
var pauseButton = e('#id-pause-button')
var selector = '.audio-circle'
var autoPlay = function() {
    bindEvent(playButton, 'click', function(){
          playAnimation()
          audio.play()
          timeShow()
    })
    bindEvent(pauseButton, 'click', function(){
          stopAnimation()
          audio.pause()
    })
    bindAll(selector, 'click', function(event){
        // log('click')
        playAnimation()
        var getMusic = event.target.innerHTML
            audio.src = 'musics/' + getMusic
            audio.autoplay = true
            bindEvent(audio, 'canplay', function(){
                // log('开始播放')
                timeShow()
          })
     })
     bindEvent(audio, 'ended',function() {
       var musics = [ 'musics/那些花儿.mp3', 'musics/给我一首歌的时间.mp3', 'musics/极乐净土.mp3']
       var index = audio.dataset.index
       audio.src = musics[(index + 1) % 3 ]
       audio.dataset.index = (index + 1) % 3
       audio.autoplay = true
     })
}

var transTime = function(time) {
  var minute = String(Math.floor(time / 60))
  if (minute.length === 1) {
    minute = '0' + minute
  }
  var second = String(Math.floor(time % 60))
  if (second.length === 1) {
    second = '0' + second
  }
  var t = `${minute}:${second}`
  return t
}
var timeShow = function() {
  var currentT = e('#id-span-currentTime')
  var totalT = e('#id-span-totalTime')
  var current = 0
  // 每秒获取播放时间
  setInterval(function(){
    current = audio.currentTime
    currentT.innerHTML = transTime(current)
  }, 1000)
  var total = audio.duration
  totalT.innerHTML = transTime(total)
}

var playAnimation = function() {
    var animation = 'audio-spin'
    var block = e('.audio-block')
    // 让它开始播放动画
    block.classList.add(animation)
}
var stopAnimation = function() {
    var animation = 'audio-spin'
    var block = e('.audio-block')
    // 让它开始播放动画
    block.classList.remove(animation)
}

var __main = function() {
    playAnimation()
    audio.play()
    autoPlay()
}

__main()
