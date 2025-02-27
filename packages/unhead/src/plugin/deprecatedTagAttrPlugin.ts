// legacy tag support
import { defineHeadPlugin } from '@unhead/shared'

export const DeprecatedTagAttrPlugin = () => {
  return defineHeadPlugin({
    hooks: {
      'tag:normalise': function ({ tag }) {
        if (typeof tag.props.body !== 'undefined') {
          tag.tagPosition = 'bodyClose'
          delete tag.props.body
        }
      },
    },
  })
}
