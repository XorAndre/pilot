import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'

import {
  Button,
  CardActions,
  CardContent,
  Col,
  FormCheckbox,
  FormDropdown,
  FormInput,
  Grid,
  RadioGroup,
  Row,
  Spacing,
} from 'former-kit'

import { range } from 'ramda'

import { virtualPageView } from '../../../vendor/googleTagManager'
import createCpfCnpjValidation from '../../../validation/cpfCnpj'
import createEmailValidation from '../../../validation/email'
import createPhoneValidation from '../../../validation/phone'
import createUrlValidation from '../../../validation/protocol'
import createRequiredValidation from '../../../validation/required'
import style from './style.css'

const PARTNER_LIMIT = 5

const partnerOptions = range(0, PARTNER_LIMIT + 1)
  .map(index => ({ name: index.toString(), value: index.toString() }))

const masks = {
  cnpj: '11.111.111/1111-11',
  cpf: '111.111.111-11',
  phone: '(11) 11111-1111',
}

const partnerInitialization = {
  cpf: '',
  name: '',
  phone: '',
}

const getValidations = (data, t) => {
  const requiredMessage =
    t('pages.add_recipient.field_required')

  let validateCpfCnpjMessage =
    t('pages.add_recipient.field_invalid_cpf')

  if (data.documentType === 'cnpj') {
    validateCpfCnpjMessage = t('pages.add_recipient.field_invalid_cnpj')
  }

  const validateEmailMessage =
    t('pages.add_recipient.field_invalid_email')

  const validatePhoneMessage =
    t('pages.add_recipient.field_invalid_phone')

  const validateUrlMessage =
    t('pages.add_recipient.field_url')

  const required = createRequiredValidation(requiredMessage)
  const validateCpfCnpj = createCpfCnpjValidation(validateCpfCnpjMessage)
  const validateEmail = createEmailValidation(validateEmailMessage)
  const validateEmailIfExists = (email) => {
    if (email === '') {
      return null
    }
    return validateEmail(email)
  }
  const validatePhone = createPhoneValidation(validatePhoneMessage)
  const validatePhoneIfExists = (phone) => {
    if (phone === '') {
      return null
    }
    return validatePhone(phone)
  }
  const validateUrl = createUrlValidation(validateUrlMessage)
  const validateUrlIfExists = (url) => {
    if (url === '') {
      return null
    }
    return validateUrl(url)
  }

  if (data.documentType === 'cnpj') {
    const partnerValidations = {
      cpf: [required, validateCpfCnpj],
      email: [required, validateEmailIfExists],
      name: [required],
    }

    return {
      cnpj: [required, validateCpfCnpj],
      cnpjEmail: [required, validateEmailIfExists],
      cnpjName: [required],
      cnpjPhone: [validatePhoneIfExists],
      cnpjUrl: [validateUrlIfExists],
      documentInformation: [required, validatePhone, validateEmailIfExists],
      documentType: [],
      partner0: partnerValidations,
      partner1: partnerValidations,
      partner2: partnerValidations,
      partner3: partnerValidations,
      partner4: partnerValidations,
    }
  }
  return {
    cpf: [required, validateCpfCnpj],
    cpfEmail: [required, validateEmailIfExists],
    cpfName: [required],
    cpfPhone: [validatePhoneIfExists],
    cpfUrl: [validateUrlIfExists],
  }
}

class IdentificationStep extends Component {
  constructor (props) {
    super(props)

    this.state = {
      formData: {
        cnpj: '',
        cnpjEmail: '',
        cnpjInformation: false,
        cnpjName: '',
        cnpjPhone: '',
        cnpjUrl: '',
        cpf: '',
        cpfEmail: '',
        cpfInformation: false,
        cpfName: '',
        cpfPhone: '',
        cpfUrl: '',
        documentType: 'cpf',
        partner0: partnerInitialization,
        partner1: partnerInitialization,
        partner2: partnerInitialization,
        partner3: partnerInitialization,
        partner4: partnerInitialization,
        partnerNumber: '0',
        ...props.data,
      },
    }

    this.onChangeWithMask = this.onChangeWithMask.bind(this)
    this.onFormChange = this.onFormChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.renderDocumentInput = this.renderDocumentInput.bind(this)
    this.toggleAdditionalInformation =
      this.toggleAdditionalInformation.bind(this)
    this.validateRepeatedDocuments = this.validateRepeatedDocuments.bind(this)
  }

  componentDidMount () {
    virtualPageView({
      path: '/virtual/recipient/add/identification',
      title: 'Add Recipient - Identification',
    })
  }

  onFormSubmit (formData, formErrors) {
    const updatedErrors = this.validateRepeatedDocuments(formErrors)
    if (updatedErrors) {
      this.setState({
        formErrors: updatedErrors,
      })
      return
    }
    this.props.onContinue(formData)
  }

  onFormChange (formData) {
    this.setState({
      formData,
    })
    this.state.formErrors = []
  }

  onChangeWithMask (event, partner) {
    const {
      name,
      value = '',
    } = event.target

    let data = { [name]: value }

    if (partner) {
      data = {
        [partner]: {
          ...this.state.formData[partner],
          [name]: value,
        },
      }
    }

    const formData = {
      ...this.state.formData,
      ...data,
    }

    this.onFormChange(formData)
  }

  validateRepeatedDocuments (errors) {
    const { t } = this.props
    let formErrors = errors

    const {
      partner0,
      partner1,
      partner2,
      partner3,
      partner4,
    } = this.state.formData

    const partners = {
      partner0,
      partner1,
      partner2,
      partner3,
      partner4,
    }

    const uniqueDocuments = {}
    const repeatedErrorMessage =
      t('pages.add_recipient.field_repeated_document')

    Object.keys(partners).forEach((partner) => {
      const { cpf } = partners[partner]
      if (cpf) {
        if (!uniqueDocuments[cpf]) {
          uniqueDocuments[cpf] = true
        } else {
          if (!formErrors) formErrors = {}
          if (!formErrors[partner]) formErrors[partner] = {}
          formErrors[partner].cpf = repeatedErrorMessage
        }
      }
    })

    return formErrors
  }

  toggleAdditionalInformation () {
    const { documentType } = this.state.formData
    const additionalInfo = `${documentType}Information`
    const shouldShowInfo = !this.state.formData[additionalInfo]

    this.setState({
      formData: {
        ...this.state.formData,
        [additionalInfo]: shouldShowInfo,
      },
    })
  }

  renderDocumentInput () {
    const { documentType } = this.state.formData
    const { t } = this.props

    if (documentType === 'cpf') {
      return (
        <FormInput
          key="cpf"
          label={t('pages.add_recipient.cpf')}
          mask={masks.cpf}
          name="cpf"
          onChange={this.onChangeWithMask}
        />
      )
    }

    return (
      <FormInput
        key="cnpj"
        label={t('pages.add_recipient.cnpj')}
        mask={masks.cnpj}
        name="cnpj"
        onChange={this.onChangeWithMask}
      />
    )
  }

  renderInformationCheck () {
    const { documentType } = this.state.formData
    const { t } = this.props

    const info = (documentType === 'cpf')
      ? t('pages.add_recipient.more_recipient_information')
      : t('pages.add_recipient.more_company_information')

    return (
      <FormCheckbox
        checked={this.state.formData[`${documentType}Information`]}
        label={info}
        name={`${documentType}Information`}
        onChange={this.toggleAdditionalInformation}
        value=""
      />
    )
  }

  renderDocumentInformationInput () {
    const {
      formData: {
        documentType,
      },
    } = this.state

    const { t } = this.props

    return (
      <Fragment>
        <Row>
          <h2 className={style.receiverTitle}>
            {
              (documentType === 'cpf')
                ? t('pages.add_recipient.recipient')
                : t('pages.add_recipient.company')
            }
          </h2>
        </Row>
        <Row>
          <span className={style.subtitle}>
            {
              (documentType === 'cpf')
                ? t('pages.add_recipient.fill_recipient_info')
                : t('pages.add_recipient.fill_company_info')
            }
          </span>
        </Row>
        <Row>
          <Col>
            <FormInput
              label={
                (documentType === 'cpf')
                  ? t('pages.add_recipient.name')
                  : t('pages.add_recipient.company_name')
              }
              name={`${documentType}Name`}
            />
          </Col>
          <Col>
            <FormInput
              label={t('pages.add_recipient.email')}
              name={`${documentType}Email`}
            />
          </Col>
        </Row>
        <Row stretch>
          <Col>
            <FormInput
              label={t('pages.add_recipient.optional_url')}
              name={`${documentType}Url`}
            />
          </Col>
          <Col>
            <FormInput
              key="documentPhone"
              label={t('pages.add_recipient.optional_phone')}
              mask={masks.phone}
              name={`${documentType}Phone`}
              onChange={this.onChangeWithMask}
            />
          </Col>
        </Row>
      </Fragment>
    )
  }

  renderPartnerInput () {
    const { t } = this.props
    const { partnerNumber } = this.state.formData

    return (
      range(0, parseInt(partnerNumber, 10)).map(partnerIndex => (
        <fieldset
          className={style.fieldset}
          key={`fieldset${partnerIndex}`}
          name={`partner${partnerIndex}`}
        >
          <Row stretch>
            <Col>
              <FormInput
                label={t('pages.add_recipient.name')}
                name="name"
              />
            </Col>
            <Col>
              <FormInput
                label={t('pages.add_recipient.cpf')}
                mask={masks.cpf}
                name="cpf"
                onChange={event =>
                  this.onChangeWithMask(event, `partner${partnerIndex}`)}
              />
            </Col>
            <Col>
              <FormInput
                label={t('pages.add_recipient.email')}
                name="email"
                onChange={event =>
                  this.onChangeWithMask(event, `partner${partnerIndex}`)}
              />
            </Col>
          </Row>
        </fieldset>
      ))
    )
  }

  render () {
    const {
      errors,
      onCancel,
      t,
    } = this.props

    const {
      formData,
      formData: {
        documentType,
      },
      formErrors,
    } = this.state

    return (
      <Form
        data={this.state.formData}
        errors={formErrors || errors}
        onChange={this.onFormChange}
        onSubmit={this.onFormSubmit}
        validateOn="blur"
        validation={getValidations(formData, t)}
      >
        <CardContent>
          <Row>
            <h2 className={style.title}>
              {t('pages.add_recipient.identification')}
            </h2>
          </Row>
          <Row>
            <h3 className={style.subtitle}>
              {t('pages.add_recipient.choose_recipient_type')}
            </h3>
          </Row>
          <span className={style.label}>
            {t('pages.add_recipient.recipient_type')}
          </span>
          <RadioGroup
            name="documentType"
            options={[
              {
                name: t('pages.add_recipient.physical_person'),
                value: 'cpf',
              },
              {
                name: t('pages.add_recipient.legal_person'),
                value: 'cnpj',
              },
            ]}
          />
          <Grid>
            <Row>
              <Col>
                { this.renderDocumentInput() }
              </Col>
            </Row>
            <Row>
              <Col>
                { this.renderInformationCheck() }
              </Col>
            </Row>
            { formData[`${documentType}Information`] && (
            <Fragment>
              { this.renderDocumentInformationInput()}
              { documentType === 'cnpj' && (
                <Fragment>
                  <Row>
                    <h2 className={style.partnerTitle}>
                      {t('pages.add_recipient.partners')}
                    </h2>
                  </Row>
                  <Row>
                    <h3 className={style.subtitle}>
                      {t('pages.add_recipient.fill_partner_info')}
                    </h3>
                  </Row>
                  <Row>
                    <Col>
                      <FormDropdown
                        label={t('pages.add_recipient.choose_partner_amount')}
                        name="partnerNumber"
                        options={partnerOptions}
                      />
                    </Col>
                  </Row>
                  { this.renderPartnerInput() }
                </Fragment>
              )}
            </Fragment>
            )}
          </Grid>
        </CardContent>
        <div className={style.paddingTop}>
          <CardActions>
            <Button
              fill="outline"
              onClick={onCancel}
            >
              {t('pages.add_recipient.cancel')}
            </Button>
            <Spacing size="medium" />
            <Button
              fill="gradient"
              type="submit"
            >
              {t('pages.add_recipient.continue')}
            </Button>
          </CardActions>
        </div>
      </Form>
    )
  }
}

const partnerPropTypes = PropTypes.shape({
  cpf: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
})

IdentificationStep.propTypes = {
  data: PropTypes.shape({
    cnpj: PropTypes.string,
    cnpjEmail: PropTypes.string,
    cnpjInformation: PropTypes.bool,
    cnpjName: PropTypes.string,
    cnpjPhone: PropTypes.string,
    cnpjUrl: PropTypes.string,
    cpf: PropTypes.string,
    cpfEmail: PropTypes.string,
    cpfInformation: PropTypes.bool,
    cpfName: PropTypes.string,
    cpfPhone: PropTypes.string,
    cpfUrl: PropTypes.string,
    documentType: PropTypes.string,
    partner0: partnerPropTypes,
    partner1: partnerPropTypes,
    partner2: partnerPropTypes,
    partner3: partnerPropTypes,
    partner4: partnerPropTypes,
    partnerNumber: PropTypes.string,
  }),
  errors: PropTypes.shape({
    anticipationDays: PropTypes.string,
    anticipationModel: PropTypes.string,
    anticipationVolumePercentage: PropTypes.string,
    transferDay: PropTypes.string,
    transferEnabled: PropTypes.string,
    transferInterval: PropTypes.string,
  }),
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

IdentificationStep.defaultProps = {
  data: {},
  errors: {},
}

export default IdentificationStep
