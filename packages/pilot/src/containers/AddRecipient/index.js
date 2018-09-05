import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Card, Steps } from 'former-kit'
import IdentificationStep from './IdentificationStep'
import BankAccountStep from './BankAccountStep'
import ConfigurationStep from './ConfigurationStep'
import ConfirmStep from './ConfirmStep'
import ConclusionStep from './ConclusionStep'
import ErrorStep from './ErrorStep'
import ConfirmModal from '../../components/ConfirmModal'
import Loader from '../../components/Loader'
import style from './style.css'

import {
  BANK_ACCOUNT,
  CONCLUSION,
  CONFIGURATION,
  CONFIRMATION,
  IDENTIFICATION,
} from './stepIds'

const initialStepStatus = [
  { id: IDENTIFICATION, status: 'current' },
  { id: BANK_ACCOUNT, status: 'pending' },
  { id: CONFIGURATION, status: 'pending' },
  { id: CONFIRMATION, status: 'pending' },
  { id: CONCLUSION, status: 'pending' },
]

class AddRecipients extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentStepNumber: 0,
      data: {},
      error: false,
      fetchData: {},
      isLoading: false,
      openModal: false,
      stepsStatus: [...initialStepStatus],
    }

    this.closeExitModal = this.closeExitModal.bind(this)
    this.createNewStepStatus = this.createNewStepStatus.bind(this)
    this.createSteps = this.createSteps.bind(this)
    this.fetchAndSetNextStepData = this.fetchAndSetNextStepData.bind(this)
    this.handleAsyncNextStep = this.handleAsyncNextStep.bind(this)
    this.handleBackNavigation = this.handleBackNavigation.bind(this)
    this.handleContinueNavigation = this.handleContinueNavigation.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleNextStep = this.handleNextStep.bind(this)
    this.handleTryAgain = this.handleTryAgain.bind(this)
    this.handleViewDetails = this.handleViewDetails.bind(this)
    this.openExitModal = this.openExitModal.bind(this)
    this.renderError = this.renderError.bind(this)
    this.renderStep = this.renderStep.bind(this)

    this.steps = this.createSteps(props)
  }

  handleContinueNavigation (stepData) {
    const { currentStepNumber } = this.state
    const nextStepNumber = currentStepNumber + 1
    const nextStep = this.steps[nextStepNumber]

    if (nextStep.fetch) {
      this.handleAsyncNextStep(stepData)
    } else {
      this.handleNextStep(stepData)
    }
  }

  handleNextStep (stepData) {
    const { data, currentStepNumber } = this.state
    const nextStepNumber = currentStepNumber + 1
    const currentStep = this.steps[currentStepNumber]
    const stepsStatus = this.createNewStepStatus(nextStepNumber)

    this.setState({
      currentStepNumber: nextStepNumber,
      data: {
        ...data,
        [currentStep.id]: stepData,
      },
      stepsStatus,
    })
  }

  handleAsyncNextStep (stepData) {
    const { data, currentStepNumber } = this.state
    const currentStep = this.steps[currentStepNumber]

    this.setState({
      isLoading: true,
      data: {
        ...data,
        [currentStep.id]: stepData,
      },
    }, () => {
      this.fetchAndSetNextStepData()
    })
  }

  fetchAndSetNextStepData () {
    const { currentStepNumber, fetchData } = this.state
    const nextStepNumber = currentStepNumber + 1
    const nextStep = this.steps[nextStepNumber]
    const stepsStatus = this.createNewStepStatus(nextStepNumber)

    nextStep.fetch()
      .then((nextStepFetchData) => {
        this.setState({
          currentStepNumber: nextStepNumber,
          fetchData: {
            ...fetchData,
            [nextStep.id]: nextStepFetchData,
          },
          isLoading: false,
          stepsStatus,
        })
      })
      .catch((fetchError) => {
        this.setState({
          currentStepNumber: nextStepNumber,
          error: fetchError,
          isLoading: false,
          stepsStatus,
        })
      })
  }

  handleBackNavigation () {
    const { currentStepNumber } = this.state
    const previousStepNumber = currentStepNumber - 1
    const stepsStatus = this.createNewStepStatus(previousStepNumber)

    this.setState({
      stepsStatus,
      currentStepNumber: previousStepNumber,
    })
  }

  handleTryAgain () {
    this.setState({
      currentStepNumber: 0,
      data: {},
      error: false,
      fetchData: {},
      stepsStatus: [...initialStepStatus],
    })
  }

  handleViewDetails () {
    const { id } = this.state.fetchData[CONCLUSION]
    const { onViewDetails } = this.props
    return onViewDetails(id)
  }

  handleEdit (stepId) {
    const editStep = this.steps.find(step => step.id === stepId)
    const stepIndex = this.steps.indexOf(editStep)
    const stepsStatus = this.createNewStepStatus(stepIndex)

    this.setState({
      currentStepNumber: stepIndex,
      stepsStatus,
    })
  }

  createSteps ({ fetchAccounts, submitRecipient, t }) {
    return [
      {
        id: IDENTIFICATION,
        title: t('Dados'),
      },
      {
        fetch: () => {
          const { data } = this.state
          const { documentType, cnpj, cpf } = data[IDENTIFICATION]
          return fetchAccounts({ documentType, cnpj, cpf })
        },
        id: BANK_ACCOUNT,
        title: t('Conta Bancaria'),
      },
      {
        id: CONFIGURATION,
        title: t('Configurações'),
      },
      {
        id: CONFIRMATION,
        title: t('Confirmação'),
      },
      {
        fetch: () => submitRecipient(this.state.data),
        id: CONCLUSION,
        title: t('Conclusão'),
      },
    ]
  }

  createNewStepStatus (nextStepNumber) {
    return this.steps.map((step, index) => {
      let status = 'current'

      if (index < nextStepNumber) {
        status = 'success'
      }

      if (index > nextStepNumber) {
        status = 'pending'
      }

      return {
        id: step.id,
        status,
      }
    })
  }

  openExitModal () {
    this.setState({ openModal: true })
  }

  closeExitModal () {
    this.setState({ openModal: false })
  }

  renderStep () {
    const {
      currentStepNumber,
      data,
      fetchData,
    } = this.state

    const {
      onExit,
      t,
    } = this.props

    const currentStep = this.steps[currentStepNumber]
    const currentFetchData = fetchData[currentStep.id] || {}

    const stepProps = {
      ...currentFetchData,
      data: data[currentStep.id],
      onBack: this.handleBackNavigation,
      onCancel: this.openExitModal,
      onContinue: this.handleContinueNavigation,
      onExit,
      onViewDetails: this.handleViewDetails,
      onEdit: this.handleEdit,
      t,
    }

    switch (currentStep.id) {
      case IDENTIFICATION:
        return <IdentificationStep {...stepProps} />

      case BANK_ACCOUNT:
        return <BankAccountStep {...stepProps} />

      case CONFIGURATION:
        return <ConfigurationStep {...stepProps} />

      case CONFIRMATION:
        return <ConfirmStep {...stepProps} data={data} />

      case CONCLUSION:
        return <ConclusionStep {...stepProps} />

      default:
        return null
    }
  }

  renderError () {
    const { onExit, t } = this.props
    return (
      <ErrorStep onExit={onExit} onTryAgain={this.handleTryAgain} t={t} />
    )
  }

  render () {
    const {
      error,
      isLoading,
      openModal,
      stepsStatus,
    } = this.state

    const { onExit, t } = this.props

    return (
      <Fragment>
        <Loader visible={isLoading} />
        <Card>
          <Steps
            status={stepsStatus}
            steps={this.steps}
          />
        </Card>
        <Card className={style.marginTop}>
          {
            (error)
              ? this.renderError()
              : this.renderStep()
          }
        </Card>
        <ConfirmModal
          isOpen={openModal}
          onCancel={this.closeExitModal}
          onConfirm={onExit}
          title={t('exit_modal_title')}
          cancelText={t('cancel')}
          confirmText={t('confirm')}
        >
          <p style={{ textAlign: 'center' }}>
            {t('exit_modal_message')}
          </p>
        </ConfirmModal>
      </Fragment>
    )
  }
}

AddRecipients.propTypes = {
  fetchAccounts: PropTypes.func.isRequired,
  onExit: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
  submitRecipient: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default AddRecipients
