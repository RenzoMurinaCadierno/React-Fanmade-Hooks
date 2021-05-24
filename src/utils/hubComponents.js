import CountBar from "../components/UI/composed/CountBar/CountBar"
import ExpandableIcon from "../components/UI/composed/ExpandableIcon/ExpandableIcon"
import InputField from "../components/UI/composed/InputField/InputField"
import InputWithState from "../components/UI/composed/InputWithState/InputWithState"
import PhoneDial from "../components/UI/composed/PhoneDial/PhoneDial"
import StyledInput from "../components/UI/composed/StyledInput/StyledInput"
import StyledInputWithValidation from "../components/UI/composed/StyledInputWithValidation/StyledInputWithValidation"

import Button from "../components/UI/independent/Button/Button"
import Coin from "../components/UI/independent/Coin/Coin"
import Die from "../components/UI/independent/Die/Die"
import Icon from "../components/UI/independent/Icon/Icon"
import Input from "../components/UI/independent/Input/Input"
import Label from "../components/UI/independent/Label/Label"
import PlayingCard from "../components/UI/independent/PlayingCard/PlayingCard"
import Progressbar from "../components/UI/independent/Progressbar/Progressbar"
import Switch from "../components/UI/independent/Switch/Switch"
import Text from "../components/UI/independent/Text/Text"
import Toast from "../components/UI/independent/Toast/Toast"
import Underline from "../components/UI/independent/Underline/Underline"

import Appbar from "../components/layout/Appbar/AppbarRoot/AppbarRoot"
import Carousel from "../components/layout/Carousel/CarouselRoot/CarouselRoot"
import CarouselArrow from "../components/layout/Carousel/CarouselArrow/CarouselArrow"
import CarouselIndicators from "../components/layout/composed/CarouselIndicators/CarouselIndicators"
import CarouselSlide from "../components/layout/composed/CarouselSlide/CarouselSlide"

import AppbarSection from "../components/layout/independent/AppbarSection/AppbarSection"
import AppbarLink from "../components/layout/Appbar/AppbarLink/AppbarLink"
import CarouselIndicator from "../components/layout/Carousel/CarouselIndicator/CarouselIndicator"
import Container from "../components/layout/Container/Container"
import Modal from "../components/layout/Modal/Modal"

import BTBombs from "../components/games/breakTargets/BTBombs/BTBombs"
import BTGame from "../components/games/breakTargets/BTGame/BTGame"
import BTField from "../components/games/breakTargets/BTField/BTField"
import BTScoreboard from "../components/games/breakTargets/BTScoreboard/BTScoreboard"
import BTTarget from "../components/games/breakTargets/BTTarget/BTTarget"
import BTTimer from "../components/games/breakTargets/BTTimer/BTTimer"

import CarouselExampleAuth from "../hooks/independent/useLocalStorage/demo/LocalStorageCRUD/LocalStorageCRUDRoot/CarouselExampleAuth/CarouselExampleAuth"
import CarouselExampleSettings from "../components/app-specific/CarouselExampleSettings/CarouselExampleSettings"
import CmpDescription from "../components/app-specific/wrappers/CmpDescription/CmpDescription"
import Navigation from "../components/app-specific/Navigation/Navigation"
import PageHome from "../components/app-specific/nav/pages/HomePage/HomePage"
import PageNotFound from "../components/app-specific/nav/pages/_404Page/_404Page"
import Routes from "../components/app-specific/nav/Router/Router"

export default {
  CountBar,
  ExpandableIcon,
  InputField,
  InputWithState,
  PhoneDial,
  StyledInput,
  StyledInputWithValidation,

  Button,
  Coin,
  Die,
  Icon,
  Input,
  Label,
  PlayingCard,
  Progressbar,
  Switch,
  Text,
  Toast,
  Underline,

  Appbar,
  Carousel,
  CarouselArrow,
  CarouselIndicators,
  CarouselSlide,

  AppbarSection,
  AppbarLink,
  CarouselIndicator,
  Container,
  Modal,

  BTBombs,
  BTGame,
  BTField,
  BTScoreboard,
  BTTarget,
  BTTimer,

  CarouselExampleAuth,
  CarouselExampleSettings,
  CmpDescription,
  Navigation,
  PageHome,
  PageNotFound,
  Routes
}
