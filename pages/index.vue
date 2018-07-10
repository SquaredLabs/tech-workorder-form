<template>
  <div class="form">
    <div class="header">
      <h1>CORE Tech Services Work Order Form</h1>
  
    </div>
    <div class="area account">
      <h2>Account Information</h2>
      <hr/>
      <div class="oneLiner">
          <h3>KFS Account Number</h3>
          <input class="textBox" type="text" v-model="account.KFS" placeholder="KFS #"/>
      </div>
      <div class="oneLiner">
          <h3>Account Contact</h3>
          <input class="textBox" type="text" v-model="account.Name" placeholder="Name"/>
          <input class="textBox" type="text" v-model="account.Department" placeholder="Department"/>
          <input class="textBox" type="text" v-model="account.Phone" placeholder="Phone"/>
      </div>
      <div class="oneLiner">
          <input class="textBox" type="text" v-model="account.Email" placeholder="Email"/>
          <input class="textBox" id="addressBox" type="text" v-model="account.Address" placeholder="Address"/>
      </div>
    
    </div>
    <div class="area request">

      <h2>Request Details</h2>
      <hr/>
      <div class="oneLiner">
          <h3>Type</h3>
          <input class="textBox" type="text" v-model="request.Type" placeholder="Type"/>
      </div>
      <div class="oneLiner">
          <h3>Cost Estimate</h3>
          <input class="textBox" type="text" v-model="request.CostEstimate" 
          placeholder="Cost Estimate (optional)"/>
      </div>
      <div class="oneLiner">
          <h3>TFS Unit</h3>
          <select v-model="request.TFSUnit">
            <option value="mechanical">Glass / Mechanical</option>
            <option value="electronics">Electronics / Office Equipment</option>
          </select> 
          
      </div>
      <div class="oneLiner">
        <input class="textBox" type="text" v-show="request.TFSUnit==='electronics'"
        v-model="request.MakeModel" placeholder="Make/Model"/>
        <input class="textBox" type="text" v-model="request.Location" 
        placeholder="Location"/>
        
      </div>
      
      <br/>
      <textarea class="textBox description" v-model="request.Description" placeholder="Description"/>

    </div>
    <div class="area contact">
      <h2>Contact Information</h2>
      <hr/>
      <div class="oneLiner">
        <button class="copyContact" v-on:click="copyContact">Copy Account Contact</button>
      </div>
      <div class="oneLiner">
          <input class="textBox" type="text" v-model="contact.Name" placeholder="Name"/>
          <input class="textBox" type="text" v-model="contact.Phone" placeholder="Phone"/>
          <input class="textBox" type="text" v-model="contact.Email" placeholder="Email"/>
      </div>

    </div>

    <button class="submit" v-bind:class="{disabled:submitText!=='Submit'}" v-on:click="submit">{{submitText}}</button>

  </div>
</template>

<script>

import checkBox from '~/components/checkBox.vue'
require('es6-promise').polyfill();
require('isomorphic-fetch');
const verifyForm = require('~/lib/verifyForm')

export default {
  components: {
    checkBox
  },
  data: () => ({
    account: { //Not using camel case because user will see these keys (IE: "Error, CostEstimate not entered!")
      KFS:'',
      Name:'',
      Department:'',
      Address:'',
      Phone:'',
      Email:''
    },

    request: {
      Type:'',
      CostEstimate:0,
      TFSUnit:'',
      Description:'',
      MakeModel: '',
      Location: ''
    },

    contact: {
      Name:'',
      Phone:'',
      Email:''
    },
  }),
  methods: {
    copyContact(){
      this.contact.Name = this.account.Name
      this.contact.Phone = this.account.Phone
      this.contact.Email = this.account.Email
    },
    submit(){
      fetch('/api/submit',{
        method: 'post',
        headers: {"Content-Type": "application/json; charset=utf-8",},
        body: JSON.stringify(this.$data)
      })
      .then(function(response) {
        if (response.status >= 400) {
          console.error("Bad response from server");
          console.log(response)
        }
      })

    }
  },
  computed: {
    submitText(){
      let errorMsg = verifyForm(this.$data)
      if(errorMsg===0) return 'Submit'
      return errorMsg
    }
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Space+Mono');

html, body {
  font-family: "Space Mono";
  background: #e2e1e0;
}

input {
  font-size: 1em;
}

.header {
  text-align: center;
}

.header h1 {
  margin-bottom: 1em;
}

.form{
  display: flex;
  flex-direction: column;
  margin: 2em;
}

.area {
  margin: 2em;
  border-radius: 1px;
  padding: 1em;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.area h2 {
  margin-bottom: 1em;
}

.oneLiner {
  display: flex;
  margin-top: 1em;
  flex-wrap: wrap;
}

.oneLiner * {
  margin-top: 1em;
  flex: 1 1 0;
}

.oneLiner h3{
  margin-right: 2em;
}

.oneLiner input {
  margin-right: 1em; 
}

#addressBox {
  flex-grow: 1;
}

.textBox {
  border: none;
  outline: none;
  background-color: rgb(226, 226, 226);
  padding: 0.5em;
  border-radius: 2px;
  transition: ease 0.3s all;
}

.textBox:hover {
  background-color: rgb(212, 212, 212);
}

.textBox:focus {
  background-color: rgb(145, 196, 209);
}

hr {
  color: #BDBDBD;
}

.description {
  width: 100%;
  margin-top: 1em;
}

.copyContact {
  font-size: 1.1em;
  border: none;
  outline: none;
  padding: 1em;
  border-radius: 2px;
  transition: ease 0.3s all;
}
.copyContact:hover {
  background-color: rgb(142, 210, 235);
  cursor: pointer;
}

.submit {
  margin: 1em 8em 0 8em;
  font-size: 1.5em;
  border: none;
  outline: none;
  padding: 1em;
  border-radius: 2px;
  transition: ease 0.3s all;
  box-shadow: 0 1px 3px rgba(0,0,0,0.16), 0 1px 3px rgba(0,0,0,0.23);
  background-color: rgb(214, 255, 214);
}

.submit:hover {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  cursor: pointer;
  background-color: rgb(153, 255, 153);
}

.submit.disabled{
  pointer-events: none;
  background-color:rgb(255, 184, 184);
}

</style>
