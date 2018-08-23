import React from 'react'
import PropTypes from 'prop-types'
import {
  CardSection,
  CardSectionDoubleLineTitle,
  CardContent,
} from 'former-kit'

const RecipientItem = ({
  title,
  subtitle,
  icon,
  collapsed,
  onClick,
  children,
  id,
}) => (
  <CardContent>
    <CardSection>
      <CardSectionDoubleLineTitle
        title={title}
        subtitle={subtitle}
        collapsed={!collapsed}
        icon={icon}
        onClick={() => onClick(id)}
      />
      {collapsed &&
        <CardContent>
            {children}
        </CardContent>
      }
    </CardSection>
  </CardContent>
)

RecipientItem.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.node,
  icon: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  collapsed: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string,
}

RecipientItem.defaultProps = {
  title: '',
  subtitle: '',
  collapsed: false,
  id: '',
}

export default RecipientItem
