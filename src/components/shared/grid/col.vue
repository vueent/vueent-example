<template>
  <div :class="className"><slot></slot></div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    cols: Number as PropType<number>,
    sm: Number as PropType<number>,
    md: Number as PropType<number>,
    lg: Number as PropType<number>,
    xl: Number as PropType<number>,
    unpadded: Boolean as PropType<boolean>
  },

  setup(props) {
    const className = computed(() => {
      const result: Record<string, boolean> = { col: true };

      if (props.cols) result[`col_${props.cols}`] = true;
      if (props.sm) result[`col_sm-${props.sm}`] = true;
      if (props.md) result[`col_md-${props.md}`] = true;
      if (props.lg) result[`col_lg-${props.lg}`] = true;
      if (props.xl) result[`col_xl-${props.xl}`] = true;
      if (props.unpadded) result['col_unpadded'] = true;

      return result;
    });

    return { className };
  }
});
</script>

<style lang="scss" scoped>
.col {
  margin: 0;
  padding: 1rem;

  @for $i from 1 through 12 {
    &_#{$i} {
      @media screen and (min-width: 0) {
        width: calc(100% / 12 * $i);
      }
    }
  }

  @for $i from 1 through 12 {
    &_sm-#{$i} {
      @media screen and (min-width: $screen-sm-min) {
        width: calc(100% / 12 * $i);
      }
    }
  }

  @for $i from 1 through 12 {
    &_md-#{$i} {
      @media screen and (min-width: $screen-md-min) {
        width: calc(100% / 12 * $i);
      }
    }
  }

  @for $i from 1 through 12 {
    &_lg-#{$i} {
      @media screen and (min-width: $screen-lg-min) {
        width: calc(100% / 12 * $i);
      }
    }
  }

  @for $i from 1 through 12 {
    &_xl-#{$i} {
      @media screen and (min-width: $screen-xl-min) {
        width: calc(100% / 12 * $i);
      }
    }
  }

  &_unpadded {
    padding: 0;
  }
}
</style>
