import React from "react"
import "./styles.less"
import { Row, Col, Typography } from "antd"
import { isMobile } from "../../utils"
const { Text, Title } = Typography

// months in JS Date() starts with 0 - so Dec is 11 not 12
const secondsPerYear = 3600.0 * 24 * 365.25
const startDate = new Date(2018, 0, 1, 0, 0, 0)
const initialAnnualEmissions = 42.0 * 1e9
const annualGrowthRate = 1.0 // 1.022;

const langCounter = {
  years: {
    de: "Jahre",
    en: "Years"
  },
  yearsMob: {
    de: "Jahre",
    en: "Years"
  },
  months: {
    de: "Mon.",
    en: "months"
  },
  monthsMob: {
    de: "Mon.",
    en: "mon"
  },
  days: {
    de: "Tage",
    en: "days"
  },
  daysMob: {
    de: "Tage",
    en: "days"
  },
  hours: {
    de: "St.",
    en: "hours"
  },
  hoursMob: {
    de: "St.",
    en: "h"
  },
  minutes: {
    de: "Min.",
    en: "minutes"
  },
  minutesMob: {
    de: "Min.",
    en: "min"
  },
  seconds: {
    de: "Sek.",
    en: "seconds"
  },
  secondsMob: {
    de: "Sek.",
    en: "sec"
  }
}

const TimeUnit = ({ time, unit }) => {
  return (
    <div className="time-unit">
      <div className="wrapper">
        <div className="time">{time}</div>
        <div className="unit">{unit}</div>
      </div>
    </div>
  )
}

class CarbonCounter extends React.Component {
  state = {
    years: "",
    months: "",
    days: "",
    hours: "",
    minutes: "",
    miliseconds: "",
    seconds: "",
    carbontonnes: "",
    totalBudget: 420 * 1e9,
    emPerSec: ""
  }

  componentDidMount() {
    this.carbonInterval = setInterval(() => this.myTimer(), 83)
    const emissionsPerSecond = this.getCurrentEmissionsPerS()
      .toFixed(0)
      .toLocaleString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1'")
    this.setState({ emPerSec: emissionsPerSecond })
    // set the budget based on the settings
    if (this.props.climate_goal === "2 degrees") {
      this.setState({ totalBudget: 1170 * 1e9 })
    } else {
      this.setState({ totalBudget: 420 * 1e9 })
    }
  }

  componentWillUnmount() {
    clearInterval(this.carbonInterval)
  }

  handleSwitch = () => {
    if (this.state.totalBudget === 420 * 1e9) {
      this.setState({ totalBudget: 1170 * 1e9 })
    } else {
      this.setState({ totalBudget: 420 * 1e9 })
    }
  }

  render() {
    const isOnMobile = isMobile()
    const { text, title, source } = this.props
    const langKey = "de"
    return (
      <Row className="carbon-counter">
        <Col xs={14}>
          <div className="counter-wrapper">
            <TimeUnit
              time={this.state.years}
              unit={
                isOnMobile
                  ? langCounter.yearsMob[langKey]
                  : langCounter.years[langKey]
              }
            />
            <TimeUnit
              time={this.state.months}
              unit={
                isOnMobile
                  ? langCounter.monthsMob[langKey]
                  : langCounter.months[langKey]
              }
            />
            <TimeUnit
              time={this.state.days}
              unit={
                isOnMobile
                  ? langCounter.daysMob[langKey]
                  : langCounter.days[langKey]
              }
            />
            <TimeUnit
              time={this.state.hours}
              unit={
                isOnMobile
                  ? langCounter.hoursMob[langKey]
                  : langCounter.hours[langKey]
              }
            />
            <TimeUnit
              time={this.state.minutes}
              unit={
                isOnMobile
                  ? langCounter.minutesMob[langKey]
                  : langCounter.minutes[langKey]
              }
            />
            <TimeUnit
              time={this.state.seconds}
              unit={
                isOnMobile
                  ? langCounter.secondsMob[langKey]
                  : langCounter.seconds[langKey]
              }
            />
            <TimeUnit time={this.state.miliseconds} unit="ms" />
          </div>
        </Col>
      </Row>
    )
  }

  myTimer() {
    var dd = this.countdownTime(this.getDoomTime())
      .split(" ")
      .reverse()
    // console.log(dd.length+' '+dd);
    if (dd.length > 6) this.setState({ years: parseInt(dd[6]) })
    else this.setState({ years: "0" })
    if (dd.length > 5) this.setState({ months: parseInt(dd[5]) })
    else this.setState({ months: "0" })
    if (dd.length > 4) this.setState({ days: parseInt(dd[4]) })
    else this.setState({ days: "0" })
    this.setState({
      hours: parseInt(dd[3]),
      minutes: parseInt(dd[2]),
      seconds: parseInt(dd[1]),
      miliseconds: parseInt(dd[0])
    })

    var out = []
    if (this.getBudgetLeft() > 0) {
      out.push(this.getBudgetLeft().toFixed(0))
      out.join("")
      this.setState({
        carbontonnes: out
          .toLocaleString()
          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1'")
      })
    } else {
      out.push("exhausted by: " + -this.getBudgetLeft().toFixed(0))
      out.join("")
      this.setState({
        carbontonnes: out
          .toLocaleString()
          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1'")
      })
    }
  }

  countdownTime(target) {
    // target should be a Date object

    // eslint-disable-next-line one-var
    var now = new Date(),
      yd,
      md,
      dd,
      hd,
      nd,
      sd,
      ms,
      out = []

    if (target.getTime() - now.getTime() > 0) {
      yd = target.getFullYear() - now.getFullYear()
      md = target.getMonth() - now.getMonth()
      dd = target.getDate() - now.getDate()
      hd = target.getHours() - now.getHours()
      nd = target.getMinutes() - now.getMinutes()
      sd = target.getSeconds() - now.getSeconds()
      while (true) {
        if (md < 0) {
          yd--
          md += 12
        }
        if (dd < 0) {
          md--
          dd += this.getDaysInMonth(now.getMonth() - 1, now.getFullYear())
        }
        if (hd < 0) {
          dd--
          hd += 24
        }
        if (nd < 0) {
          hd--
          nd += 60
        }
        if (sd < 0) {
          nd--
          sd += 60
        }
        if (md >= 0 && yd >= 0 && dd >= 0 && hd >= 0 && nd >= 0 && sd >= 0) {
          break
        }
      }
    } else {
      yd = -target.getFullYear() + now.getFullYear()
      md = -target.getMonth() + now.getMonth()
      dd = -target.getDate() + now.getDate()
      hd = -target.getHours() + now.getHours()
      nd = -target.getMinutes() + now.getMinutes()
      sd = -target.getSeconds() + now.getSeconds()
    }
    const alwaysTrue = true
    if (alwaysTrue) {
      // (yd > 0)
      out.push(yd + "y " + (yd === 1 ? "" : ""))
    }
    if (md < 10 && md >= 0) {
      out.push("0" + md + "m " + (md === 1 ? "" : ""))
    } else if (md >= 10) {
      out.push(md + "m ")
    }
    if (dd < 10 && dd >= 0) {
      out.push("0" + dd + "d " + (dd === 1 ? "" : ""))
    } else if (dd >= 10) {
      out.push(dd + "d ")
    }
    if (hd < 10 && hd >= 0) {
      out.push("0" + hd + "h " + (hd === 1 ? "" : ""))
    } else if (hd >= 10) {
      out.push(hd + "h ")
    }
    if (nd < 10 && nd >= 0) {
      out.push("0" + nd + "' " + (nd === 1 ? "" : ""))
    } else if (nd >= 10) {
      out.push(nd + "' ")
    }
    if (sd < 10 && sd >= 0) {
      out.push("0" + sd + "'' " + (sd === 1 ? "" : ""))
    } else if (sd >= 10) {
      out.push(sd + "'' ")
    }

    if (target.getTime() - now.getTime() > 0) {
      ms =
        99 -
        now
          .getMilliseconds()
          .toString()
          .slice(0, 2)
    } else {
      ms = now
        .getMilliseconds()
        .toString()
        .slice(0, 2)
    }
    if (ms < 10 && ms >= 0) {
      out.push("0" + ms + "" + (ms === 1 ? "" : ""))
    } else if (ms >= 10) {
      out.push(ms + "")
    }

    return out.join("")
  }

  getDaysInMonth(month, year) {
    if (typeof year === "undefined") {
      year = 2015
    }
    // any non-leap-year works as default
    var currmon = new Date(year, month)
    var nextmon = new Date(year, month + 1)
    return Math.floor(
      (nextmon.getTime() - currmon.getTime()) / (24 * 3600 * 1000)
    )
  }

  sPassed() {
    var now = new Date()
    var diff = []
    diff = Math.floor((now.getTime() - startDate.getTime()) / 1000.0)
    return diff
  }

  getCurrentEmissionsPerS() {
    var res =
      (initialAnnualEmissions / secondsPerYear) *
      Math.pow(annualGrowthRate, this.sPassed(startDate) / secondsPerYear)
    return res
  }

  getBudgetLeft() {
    var budgetUsed
    if (annualGrowthRate === 1) {
      budgetUsed =
        (this.sPassed(startDate) / secondsPerYear) * initialAnnualEmissions
    } else {
      budgetUsed =
        (initialAnnualEmissions / Math.log(annualGrowthRate)) *
        (Math.pow(annualGrowthRate, this.sPassed(startDate) / secondsPerYear) -
          1)
    }
    var res = this.state.totalBudget - budgetUsed
    return res
  }

  getDoomTime() {
    var yearsRemaining
    if (annualGrowthRate === 1) {
      yearsRemaining = this.state.totalBudget / initialAnnualEmissions
    } else {
      yearsRemaining =
        Math.log(
          (this.state.totalBudget / initialAnnualEmissions) *
            Math.log(annualGrowthRate) +
            1
        ) / Math.log(annualGrowthRate)
    }
    var d = new Date(
      startDate.getTime() + yearsRemaining * secondsPerYear * 1000
    )
    return d
  }
}

export default CarbonCounter
