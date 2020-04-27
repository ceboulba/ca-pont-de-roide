'use strict'
import './style.css'
import * as BABYLON from 'babylonjs'
const canvas = document.getElementById('renderCanvas')
const imgBox = document.getElementById('img-box')
const imgView = document.getElementById('img-view')
const viewType = document.querySelector('.view-type')
const imageName = document.querySelector('.imageName')
console.log(imageName.innerHTML)

const imgs = [
  'https://res.cloudinary.com/archipicture/image/upload/v1588000025/ca-pont-de-roide/pont-de-roide-axo-rdc-a-hd.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1588000216/ca-pont-de-roide/pont-de-roide-axo-1er-a-hd.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1588000214/ca-pont-de-roide/pont-de-roide-axo-1er-b-hd.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1587975825/ca-pont-de-roide/pont-de-roide-01-hd.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1587979680/ca-pont-de-roide/pont-de-roide-02-hd.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1587983134/ca-pont-de-roide/pont-de-roide-02-hd-color.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1587984085/ca-pont-de-roide/pont-de-roide-03-hd.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1587991183/ca-pont-de-roide/pont-de-roide-04-hd.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1587991183/ca-pont-de-roide/pont-de-roide-05-hd.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1587993560/ca-pont-de-roide/pont-de-roide-06-hd.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1587997179/ca-pont-de-roide/pont-de-roide-07-hd.jpg',
]
const imgName= [
  'R.D.C axo 1',
  'Étage axo 1',
  'Étage axo 2',
  'Espace libre service bancaire',
  'Espace attente / carré',
  'Espace attente / carré variante',
  'Espace collaborateurs R.D.C',
  'Espace collaborateurs R.D.C',
  'Circulation étage',
  'Circulation étage',
  'Espace collaborateurs étage',
]

let num = 0

const btnPrev = document.getElementById('btnPrev').addEventListener('click', () => prev())
const btnNext = document.getElementById('btnNext').addEventListener('click', () => next())

var engine = new BABYLON.Engine(canvas, true)

var createScene = function () {
  var scene = new BABYLON.Scene(engine)
  var camera = new BABYLON.ArcRotateCamera(   
    'Camera',
   9,
    Math.PI / 2,
    2,
    BABYLON.Vector3.Zero(),
    scene
  )

  camera.attachControl(canvas, true)
  camera.inputs.attached.mousewheel.detachControl(canvas)
  //camera.lowerAlphaLimit = .85
  //camera.upperAlphaLimit = 4.77

  let zoomLevel = 2

  var dome = new BABYLON.PhotoDome(
    'testdome',
    imgs[num],
    {
      resolution: 32,
      size: 15,
      useDirectMapping: false,
    },
    scene
  )

  return scene
}

const scene = createScene()

const check = () => {
  num <= 2 ?( () => {
    canvas.classList.add('hide');
    imgBox.classList.remove('hide');
    viewType.classList.add('hide')
  })()
    :( () => {
      canvas.classList.remove('hide')
      viewType.classList.remove('hide')
      imgBox.classList.add('hide')
    })()
  // scene.render()
  num <= 2 ? imgView.src = imgs[num] : null
  //num === 8 ? imgView.src = imgs[8] : null
  //num === 9 ? imgView.src = imgs[9] : null
}

check()

const next = () => {
  num < imgs.length - 1 ?
    num++
    : num = 0
  scene = createScene()
  check()
}

const prev = () => {
  //event.preventDefault()
  num === 0 ?
    num = imgs.length - 1
    : num--
  scene = createScene()
  check()
}

engine.runRenderLoop(function () {
    imageName.innerHTML = imgName[num]
  scene.render()
})

if(num!==0){
window.addEventListener('resize', function () {
  engine.resize()  
})
}
