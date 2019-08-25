import React from "react"
import styled from "styled-components"
import {Input} from "../form/input"
import {Button} from "../elements/buttom"
import Untrusive from "untrusive"

const untrusive = new Untrusive({
  bgColor: "#a9f89d",
  barColor: "#33cb25"
})

const Wrapper = styled.div`
  padding: 40px;
  background: var(--bg2);
  border-radius: 5px;
  h3 {
    font-size: 1.5rem;
    font-weight: bold;
  }
  p {
    margin-top: 10px;
    font-size: 1.2rem;
    line-height: 1.6;
  }
  form {
    display: flex;
    flex-wrap: nowrap;
    margin-top: 20px;
    input {
      flex-grow: 1;
      margin-right: 20px;
    }
    button {
      width: 140px;
    }
  }
`

function subscribe(email: string, success: () => void) {
  if (!email) return
  untrusive.start()
  email = encodeURIComponent(email)
  const url = `/subscribe-newsletter?email=${email}`
  const base = process.env.NODE_ENV === "production" ? "https://pathof.dev/.netlify/functions" : "http://localhost:9000"
  fetch(base + url)
    .then((res) => {
      untrusive.stop()
      if (res.status !== 200) {
        alert("Error subscribing, try again")
      }
      else {
        success()
        alert("Thanks for subscribing!")
      }
    })
    .catch(() => {
      untrusive.stop()
      alert("Error subscribing, try again")
    })
}

export const Newsletter = ({}: {}) => {
  const [email, setEmail] = React.useState("")
  return (
    <Wrapper className="newsletter-box">
      <h3>Subscribe for updates</h3>
      <p>No spam, just high quality content. Receive an e-mail whenever I release a new article or project. </p>
      <form onSubmit={(e) => {
        e.preventDefault()
        subscribe(email, () => setEmail(""))
      }}>
        <Input
          name="email"
          type="email"
          value={email}
          required={true}
          onChange={e => setEmail(e.target.value)}
          placeholder="E-mail address"
        />
        <Button>Subscribe</Button>
      </form>
    </Wrapper>
  )
}
