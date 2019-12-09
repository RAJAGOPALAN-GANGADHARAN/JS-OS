import React,{Component} from 'react';
import './time.css';
import { eventDispatcher } from '../../../handlers';
export default class Time extends Component
{
    constructor(props)
    {
        super(props);
        this.state={date:new Date()}
    }
    componentDidMount()
    {
        setInterval(()=>{this.setState({date:new Date()})},60)
    }
    render()
    {
        return(
            <div id="time-cont" onClick={()=>{eventDispatcher('time')}}>
            <div id="line-1">{this.state.date.getHours()+':'+this.state.date.getMinutes()}</div>
            <div id="line-2">{this.state.date.getUTCDay()+'-'+this.state.date.getUTCMonth()+'-'+this.state.date.getUTCFullYear()}</div>
            </div>
        );
    }
}

const AnimatedCard = ({ animation, digit }) => {
    return(
      <div className={`flipCard ${animation}`}>
        <span>{digit}</span>
      </div>
    );
  };
  
  // function component
  const StaticCard = ({ position, digit }) => {
    return(
      <div className={position}>
        <span>{digit}</span>
      </div>
    );
  };
  
  // function component
  const FlipUnitContainer = ({ digit, shuffle, unit }) => {	
    
    // assign digit values
    let currentDigit = digit;
    let previousDigit = digit - 1;
  
    // to prevent a negative value
    if ( unit !== 'hours') {
      previousDigit = previousDigit === -1 
        ? 59 
        : previousDigit;
    } else {
      previousDigit = previousDigit === -1 
        ? 23 
        : previousDigit;
    }
  
    // add zero
    if ( currentDigit < 10 ) {
      currentDigit = `0${currentDigit}`;
    } 
    if ( previousDigit < 10 ) {
      previousDigit = `0${previousDigit}`;
    }
  
    // shuffle digits
    const digit1 = shuffle 
      ? previousDigit 
      : currentDigit;
    const digit2 = !shuffle 
      ? previousDigit 
      : currentDigit;
  
    // shuffle animations
    const animation1 = shuffle 
      ? 'fold' 
      : 'unfold';
    const animation2 = !shuffle 
      ? 'fold' 
      : 'unfold';
  
    return(
      <div className={'flipUnitContainer'}>
        <StaticCard 
          position={'upperCard'} 
          digit={currentDigit} 
          />
        <StaticCard 
          position={'lowerCard'} 
          digit={previousDigit} 
          />
        <AnimatedCard 
          digit={digit1}
          animation={animation1}
          />
        <AnimatedCard 
          digit={digit2}
          animation={animation2}
          />
      </div>
    );
  };
  
class FlipClock extends React.Component {
	
    constructor(props) {
          super(props);
          this.state = {
              hours: 0,
              hoursShuffle: true,
              minutes: 0,
              minutesShuffle: true,
              seconds: 0,
              secondsShuffle: true
          };
      }
    
      componentDidMount() {
          this.timerID = setInterval(
              () => this.updateTime(),
              50
          );
      }
    
      componentWillUnmount() {
          clearInterval(this.timerID);
      }
    
      updateTime() {
          // get new date
          const time = new Date();
          // set time units
          const hours = time.getHours();
          const minutes = time.getMinutes();
          const seconds = time.getSeconds();
          // on hour chanage, update hours and shuffle state
          if( hours !== this.state.hours) {
              const hoursShuffle = !this.state.hoursShuffle;
              this.setState({
                  hours,
                  hoursShuffle
              });
          }
          // on minute chanage, update minutes and shuffle state
          if( minutes !== this.state.minutes) {
              const minutesShuffle = !this.state.minutesShuffle;
              this.setState({
                  minutes,
                  minutesShuffle
              });
          }
          // on second chanage, update seconds and shuffle state
          if( seconds !== this.state.seconds) {
              const secondsShuffle = !this.state.secondsShuffle;
              this.setState({
                  seconds,
                  secondsShuffle
              });
          }
      }
    
      render() {
      
      // state object destructuring
          const { 
        hours, 
        minutes, 
        seconds, 
        hoursShuffle, 
        minutesShuffle, 
        secondsShuffle 
      } = this.state;
          
      return(
              <div className={'flipClock'}>
                  <FlipUnitContainer 
                      unit={'hours'}
                      digit={hours} 
                      shuffle={hoursShuffle} 
                      />
                  <FlipUnitContainer 
                      unit={'minutes'}
                      digit={minutes} 
                      shuffle={minutesShuffle} 
                      />
                  <FlipUnitContainer 
                      unit={'seconds'}
                      digit={seconds} 
                      shuffle={secondsShuffle} 
                      />
              </div>
          );
      }
  }


export const TimeApp = () => {
    return(
        <div id = "TimeApp">
            <FlipClock />
        </div>
    )
}