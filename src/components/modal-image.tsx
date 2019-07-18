// ADAPTED FROM https://www.w3schools.com/howto/howto_css_modal_images.asp

import React from "react"
import styled, { keyframes } from "styled-components"

const animation = keyframes`
  from {transform:scale(0)} 
  to {transform:scale(1)}
`

const Modal = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
  #modal-image-content, #modal-image-caption {
    animation-name: ${animation};
    animation-duration: 0.6s;
  }
  #modal-image-content {
    margin: auto;
    display: block;
    max-width: 100%;
  }
  #modal-image-caption {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
    text-align: center;
    color: #ccc;
    padding: 30px 0 20px 0;
    font-size: 0.9rem;
    font-weight: 600;
  }
  .modal-image-close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
    &:hover, &:focus {
      color: #bbb;
      text-decoration: none;
      cursor: pointer;
    }
  }
  @media only screen and (max-width: 700px){
    #modal-image-content {
      width: 100%;
    }
  }
`

export class ModalImage extends React.Component {

  componentDidMount() {
    const els = document.querySelectorAll(".post-image")
    const modal = document.getElementById("modal-image")
    const image = document.getElementById("modal-image-content") as HTMLImageElement
    const caption = document.getElementById("modal-image-caption")
    const close = document.getElementsByClassName("modal-image-close")[0]
    for (let i = 0; i < els.length; i++) {
      const el = els[i]
      el.addEventListener("click", (e) => {
        if (modal && image && caption) {
          const target = e.target as HTMLImageElement
          modal.style.display = "block"
          image.src = target.src
          caption.innerHTML = target.alt || ""
        }
      })
    }
    close.addEventListener("click", (e: any) => {
      if (modal) {
        modal.style.display = "none"
      }
    })
  }

  render() {
    return (
      <Modal id="modal-image">
        <span className="modal-image-close">&times;</span>
        <img id="modal-image-content"/>
        <div id="modal-image-caption"/>
      </Modal>
    )
  }

}