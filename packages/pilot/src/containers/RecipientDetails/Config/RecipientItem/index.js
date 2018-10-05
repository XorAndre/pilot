import React from 'react'
import PropTypes from 'prop-types'
import {
  CardSection,
  CardSectionDoubleLineTitle,
  CardContent,
} from 'former-kit'

const RecipientItem = ({
  children,
  collapsed,
  icon,
  id,
  onClick,
  subtitle,
  title,
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
  children: PropTypes.node.isRequired,
  collapsed: PropTypes.bool,
  icon: PropTypes.node.isRequired,
  id: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  subtitle: PropTypes.node,
  title: PropTypes.string,
}

RecipientItem.defaultProps = {
  collapsed: false,
  id: '',
  subtitle: '',
  title: '',
}

export default RecipientItem
