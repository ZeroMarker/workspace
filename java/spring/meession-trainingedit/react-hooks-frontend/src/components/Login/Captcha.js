import React from "react"
import "./LoginPage.css"
class Captcha extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        ...this.initState()
      }
    }
  
    initState(){
      return {
        data: this.getRandom(109,48,4),
        rotate: this.getRandom(75,-75,4),
        fz: this.getRandom(8,20,4),
        color: [this.getRandom(100,255,3),this.getRandom(100,255,4),this.getRandom(100,255,3),this.getRandom(100,255,3)]
      }
    }
  
    getRandom(max, min, num) {
      const asciiNum = ~~(Math.random()*(max-min+1)+min)
      if(!Boolean(num)){
        return asciiNum
      }
      const arr = []
      for(let i = 0; i < num; i++){
        arr.push(this.getRandom(max, min))
      }
      return arr
    }
  
    render() {
      return (
           <div className='vcodewrap' >
          <canvas id="bgi" width="90" height="35"></canvas>
          {this.state.data.map((v,i) => 
            <div 
              key={i}
              className='itemStr'
            //   style={{
            //     transform:`rotate(${rotate[i]}deg)`,
            //     fontSize: `${fz[i]}px`,
            //     color: `rgb(${color[i].toString()})`
            //   }}
              onMouseEnter={() => this.setState({refresh:true})}
            >
              {String.fromCharCode(v > 57 && v < 84 ? v + 7 : ( v < 57 ? v : v + 13 ))}
            </div>  
          )}
        {
          this.state.refresh
          ? <div 
              className='mask'
              onClick={() => {
                this.setState({...this.initState(),refresh: false})
                this.canvas()
              }}
              onMouseLeave={() => {this.setState({refresh: false})}}
            > 看不清？点击刷新  
            </div> 
          : null}
        </div>
      )
    }
  
  }
  export default Captcha