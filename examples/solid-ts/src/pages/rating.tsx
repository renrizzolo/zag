import { rating } from "@ui-machines/rating"
import { normalizeProps, useMachine, useSetup, SolidPropTypes } from "@ui-machines/solid"

import { createMemo } from "solid-js"
import { css, CSSObject } from "@emotion/css"

import { StateVisualizer } from "../components/state-visualizer"
import { ratingStyle } from "../../../../shared/style"

const styles = css(ratingStyle as CSSObject)

export default function Page() {
  const [state, send] = useMachine(
    rating.machine.withContext({
      uid: "123",
      allowHalf: true,
    }),
  )

  const ref = useSetup<HTMLDivElement>({ send, id: "123" })

  const machineState = createMemo(() => rating.connect<SolidPropTypes>(state, send, normalizeProps))

  return (
    <div className={styles}>
      <div>
        <div className="rating" ref={ref} {...machineState().rootProps}>
          {Array.from({ length: machineState().size }).map((_, index) => (
            <div
              className="rating__rate"
              {...machineState().getRatingProps({ index: index + 1 })}
              style={{ width: "20px", height: "20px" }}
            />
          ))}
        </div>
        <input {...machineState().inputProps} />
      </div>

      <StateVisualizer state={state} />
    </div>
  )
}
