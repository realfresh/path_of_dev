import React from "react"
import ReactTagInput, { ReactTagInputProps } from "@pathofdev/react-tag-input"
import { Form } from "../form/form"
import { Fieldset } from "../form/fieldset"
import { Label } from "../form/label"
import { Input } from "../form/input"

const initialSettings: ReactTagInputProps = {
  tags: [],
  onChange: (tags) => {},
  placeholder: "",
  maxTags: 10,
  editable: true,
  readOnly: false,
  removeOnBackspace: true,
  validator: undefined,
}

const labelProps = {
  horizontal: true,
  textWidth: "160px",
  bold: true,
}

export function ReactTagInputDemo() {
  const [tags, setTags] = React.useState([ "john@example.com" ])
  const [settings, setSettings] = React.useState(initialSettings)
  return (
    <Form>

      <Fieldset>
        <ReactTagInput
          {...settings}
          tags={tags}
          onChange={(newTags) => setTags(newTags)}
        />
      </Fieldset>

      <Fieldset>
        <Label {...labelProps}>
          <span>Placeholder</span>
          <Input
            type="text"
            placeholder="Type and press enter"
            value={settings.placeholder}
            onChange={(e) => setSettings({ ...settings, placeholder: e.target.value })}
          />
        </Label>
        <Label {...labelProps}>
          <span>Max tags</span>
          <Input
            type="number"
            value={settings.maxTags}
            onChange={(e) => setSettings({ ...settings, maxTags: parseInt(e.target.value, 10) })}
          />
        </Label>
      </Fieldset>

      <Fieldset>
        <Label {...labelProps}>
          <span>Editable</span>
          <input
            type="checkbox"
            checked={settings.editable}
            onChange={(e) => setSettings({ ...settings, editable: e.target.checked })}
          />
        </Label>
        <Label {...labelProps}>
          <span>Read-only</span>
          <input
            type="checkbox"
            checked={settings.readOnly}
            onChange={(e) => setSettings({ ...settings, readOnly: e.target.checked })}
          />
        </Label>
        <Label {...labelProps}>
          <span>Remove on backspace</span>
          <input
            type="checkbox"
            checked={settings.removeOnBackspace}
            onChange={(e) => setSettings({ ...settings, removeOnBackspace: e.target.checked })}
          />
        </Label>
        <Label {...labelProps}>
          <span>Custom validator (email)</span>
          <input
            type="checkbox"
            checked={!!settings.validator}
            onChange={(e) => setSettings({
              ...settings,
              validator: e.target.checked ? (val) => {
                const valid = val.indexOf("@") !== -1
                if (!valid) { alert("Please enter a valid e-mail address") }
                return valid
              } : undefined,
            })}
          />
        </Label>
      </Fieldset>

    </Form>
  )
}
