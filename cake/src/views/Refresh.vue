<template>
  <div class="pdt15 pdb15">
    <input type="file" ref="fileBtn" accept="image/*" @change="uploadImg" />
    <img :src="imgSrc" class="img" ref="img" />
    <div @click="fas">发送请求</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgInfo: null,
      imgSrc: null
    };
  },
  methods: {
    async uploadImg() {
      var that = this;
      const inputFile = await this.$refs.fileBtn.files[0];
      let res;
      this.inputFile = inputFile;
      if (this.inputFile) {
        let inputFile = this.inputFile;
        this.imgInfo = Object.assign({}, this.imgInfo, {
          name: inputFile.name,
          size: inputFile.size,
          lastModifiedDate: inputFile.lastModifiedDate.toLocaleString()
        });
        const reader = new FileReader();
        res = reader.readAsDataURL(this.inputFile);
        reader.onloadend = function() {
          // var strBase64 = reader.result.substring(84);
          var strBase64 = reader.result.substring(0);
          // console.log(strBase64);
        };
        reader.onload = function(e) {
          // console.log(e);
          that.imgSrc = this.result; // 注意:这里的this.result中,这个this不是vue实例,而是reader对象,所以之前用that接收vue示例  that.imgSrc
        };
      } else {
        return;
      }
    },
    fas() {
      var key = encodeURIComponent(this.imgSrc);
      this.axios.post("/avatar", `imgData=${key}`).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

