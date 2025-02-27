import type { ActiveHeadEntry, HeadEntryOptions, MetaFlatInput } from '@unhead/schema'
import { ref, watchEffect } from 'vue'
import { unpackMeta } from 'unhead'
import type { MaybeComputedRefEntries, ReactiveHead } from '../../types'
import { resolveUnrefHeadInput } from '../../utils'
import { useHead } from './index'

export type UseSeoMetaInput = MaybeComputedRefEntries<MetaFlatInput> & { title?: ReactiveHead['title']; titleTemplate?: ReactiveHead['titleTemplate'] }

export const useSeoMeta = (input: UseSeoMetaInput, options?: HeadEntryOptions): ActiveHeadEntry<any> | void => {
  const headInput: any = ref({})
  watchEffect(() => {
    const resolvedMeta = resolveUnrefHeadInput(input)
    const { title, titleTemplate, ...meta } = resolvedMeta
    // need to unref data so we can unpack it properly
    headInput.value = {
      title,
      titleTemplate,
      meta: unpackMeta(meta),
    }
  })
  return useHead(headInput, options)
}
