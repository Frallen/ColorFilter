<template>
  <div class="index flex flex-col items-center justify-center">
    <div class="index-body bg-white border-dashed border-2	 shadow-2xl rounded-md px-4 py-4">
      <Form class="form" @submit="onSubmit" v-slot="{ setFieldValue, setValues }" :validation-schema="HexSchema()">
        <div class="form-title text-blue-500">
          Pick HEX
        </div>
        <div class="form-body">
          <label for="email" class="form-body-item">
            <span class="title text-blue-500">HEX</span>
            <Field name="hex"
                   type="text"
                   class="input"
                   :value="'#6F73EE'"
            >
            </Field>
          </label>

          <ErrorMessage name="hex" class="error text-rose-500"></ErrorMessage>
          <button type="submit"
                  class="button bg-sky-400 text-white transition-all hover:shadow-lg hover:shadow-cyan-500/50">Submit
          </button>
        </div>
      </Form>
    </div>
    <transition name="fade">
      <div class="shadow-2xl bg-white	rounded-md px-4 py-4 mt-10" v-show="currentHEX">
        <div>
          <input type="text" class="input" :value="resultMessage.Code">
        </div>
        <div>
          {{ resultMessage.Text }}
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import {Form, Field, ErrorMessage} from "vee-validate"

const currentHEX = ref<string>()
const resultMessage = reactive<{ Text: string, Code: string }>({
  Text: "",
  Code: "",
})
const Calc = () => {


  const rgb = hexToRgb(currentHEX.value as string);


  const color = new Color(rgb[0], rgb[1], rgb[2]);
  const solver = new Solver(color);
  const result = solver.solve();

  let lossMsg;


  if (result.loss < 1) {
    lossMsg = "This is a perfect result.";
  } else if (result.loss < 5) {
    lossMsg = "The is close enough.";
  } else if (result.loss < 15) {
    lossMsg = "The color is somewhat off. Consider running it again.";
  } else {
    lossMsg = "The color is extremely off. Run it again!";
  }

  resultMessage.Code= result.filter;
  resultMessage.Text= `Loss: ${result.loss.toFixed(1)}. ${lossMsg}`

}
const onSubmit = (value: { hex: string }) => {
  currentHEX.value = value.hex
  Calc()
}



</script>

<style scoped lang="less">
.index {
  height: 100vh;

  &-body {

  }
}
</style>