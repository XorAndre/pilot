import React from 'react'
import PropTypes from 'prop-types'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'

import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  Spacing,
} from 'former-kit'

import style from '../../Config/style.css'

import ImageAutomaticOne from './img/automatic_10_25_1.svg'
import ImageAutomaticTwo from './img/automatic_10_25_2.svg'
import ImageAutomaticThree from './img/automatic_10_25_3.svg'
import ImageAutomaticDx from './img/automatic_dx.svg'

const HelpModal = ({
  isOpen,
  onExit,
  t,
  title,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onExit}
    className={style.modalWidth}
  >
    <ModalTitle
      title={title}
      closeIcon={<IconClose width={16} height={16} />}
      onClose={onExit}
    />
    <div className={style.modalHeight}>
      <ModalContent>
        <hr />
        <small className={style.marginBottomforModal}>{t('pages.recipient_detail.subtitle_modal')}</small>
        <h5 className={style.modalSubtitles}>{t('pages.recipient_detail.manual_by_volume')}</h5>
        <p>{t('pages.recipient_detail.manual_by_volume_explanation_1')}</p>
        <p>{t('pages.recipient_detail.manual_by_volume_explanation_2')}</p>
        <h5 className={style.modalSubtitles}>{t('pages.recipient_detail.automatic_by_volume')}</h5>
        <p>{t('pages.recipient_detail.automatic_by_volume_explanation_1')}
          <a
            href="https://pagarme.zendesk.com/hc/pt-br/articles/217944383-Qual-percentual-das-vendas-pode-ser-recebido-antecipadamente"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('pages.recipient_detail.automatic_by_volume_explanation_link')}
          </a>
        </p>
        <h5 className={style.modalSubtitles}>{t('pages.recipient_detail.anticipation_1025')}</h5>
        <p>{t('pages.recipient_detail.anticipation_1025_explanation_1')}</p>
        <div className={style.imgSize}>
          <ImageAutomaticOne />
        </div>
        <ImageAutomaticTwo />
        <ImageAutomaticThree />
        <h5 className={style.modalSubtitles}>{t('pages.recipient_detail.anticipation_dx')}</h5>
        <p>{t('pages.recipient_detail.anticipation_dx_explanation_1')}</p>
        <ImageAutomaticDx />
      </ModalContent>
      <ModalActions>
        <div className={style.justifyContent}>
          <Button fill="gradient" onClick={onExit}>
            {t('pages.recipient_detail.exit_modal')}
          </Button>
          <Spacing />
        </div>
      </ModalActions>
    </div>
  </Modal>
)

HelpModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onExit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default HelpModal
