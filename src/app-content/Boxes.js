import { O3D } from '../gl'
import { html, render } from 'lit-html'

export class Boxes extends O3D {
  syncDOM () {
    render(html`
      <gl-o3d animated layout="flyingBox">
        <gl-box velocity=${0.01} color="#ff0000"></gl-box>
      </gl-o3d>
      <gl-o3d animated layout="flyingBox">
        <gl-box velocity=${0.02} color="#00ff00"></gl-box>
      </gl-o3d>
      <gl-o3d animated layout="flyingBox">
        <gl-box velocity=${0.03} color="#0f00ff"></gl-box>
      </gl-o3d>
    `, this.shadowRoot)
  }

  onRefreshProps () {
    this.syncDOM()
  }

  setup () {
    this.lookup('base').onLoop(() => {
      let time = window.performance.now() * 0.001
      let speed = 0.5
      this.layouts = {
        flyingBox: {
          px: `child.width * 0.5 * ${((Math.sin(time * 3.141592 * speed) * Math.sin(time * 3.141592 * speed)) - 0.5)}`,
          py: `child.height * 0.5 * ${Math.sin(time * 3.141592 * speed) * Math.cos(time * 3.141592 * speed)}`,
          pz: `child.depth * 0.5 * ${Math.sin(time * 3.141592 * speed) * Math.cos(time * 3.141592 * speed)}`
        }
      }
    })
  }

  add () {
  }

  remove () {
  }
}

window.customElements.define('gl-boxes', Boxes);
