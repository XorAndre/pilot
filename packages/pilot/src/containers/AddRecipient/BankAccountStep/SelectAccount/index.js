import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'

import {
  Button,
  CardActions,
  CardContent,
  Col,
  FormDropdown,
  Grid,
  Row,
  Spacing,
} from 'former-kit'

import accountTypes from '../../../../models/accountTypes'
import style from '../style.css'

const toDropdownOptions = ({
  account_name: accountName,
  id,
}) => ({ name: accountName, value: id })

const SelectAccount = ({
  accounts,
  data,
  onBack,
  onCancel,
  onContinue,
  t,
}) => {
  const options = accounts.map(toDropdownOptions)

  const continueWithSelectedAccount = (formData) => {
    const sameId = account => account.id === formData.id
    const account = accounts.find(sameId)
    return onContinue(account)
  }

  return (
    <Form
      onSubmit={continueWithSelectedAccount}
      data={{
        id: data.id || options[0].value,
      }}
    >
      <CardContent>
        <Grid>
          <Row>
            <Col>
              <FormDropdown
                label={t('selectAccountLabel')}
                name="id"
                options={options}
              />
            </Col>
          </Row>
        </Grid>
      </CardContent>
      <div className={style.paddingTop}>
        <CardActions>
          <Button
            type="button"
            onClick={onCancel}
            relevance="low"
            fill="outline"
          >
            {t('cancelText')}
          </Button>
          <Spacing />
          <Button
            type="button"
            onClick={onBack}
            fill="outline"
          >
            {t('backText')}
          </Button>
          <Button
            fill="gradient"
            type="submit"
          >
            {t('continueText')}
          </Button>
        </CardActions>
      </div>
    </Form>
  )
}

SelectAccount.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      account_name: PropTypes.string,
      account_number: PropTypes.string,
      account_type: PropTypes.oneOf(accountTypes),
      agency: PropTypes.string,
      bank: PropTypes.string,
      id: PropTypes.string,
    })
  ),
  data: PropTypes.shape({
    id: PropTypes.string,
  }),
  onBack: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

SelectAccount.defaultProps = {
  accounts: [],
  data: {},
}

export default SelectAccount
