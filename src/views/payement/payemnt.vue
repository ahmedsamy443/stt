<template>
	<div>
		<b-button
			@click="addnewclass"
			style="float: right"
			size="lg"
			variant="success"
			>add new payement</b-button
		>
		<b-modal
			no-close-on-backdrop="false"
			hide-header-close="false"
			no-close-on-esc="false"
			hide-footer="false"
			size="lg"
			id="addnewpayement"
		>
			<b-form-group
				id="addpayement_name"
				label="payement_name:"
				label-for="addpayement_name"
			>
				<b-form-input
					id="addpayement_name"
					type="text"
					placeholder="Enter payement_name"
					v-model="newpayement.payement_name"
					required
				></b-form-input>
			</b-form-group>
			<b-form-group id="addamount" label="amount:" label-for="addamount">
				<b-form-input
					id="addamount"
					type="number"
					placeholder="Enter amount"
					v-model="newpayement.amount"
					required
					min="1"
				></b-form-input>
			</b-form-group>
			<b-form-group
				id="addclass_name"
				label="class_name:"
				label-for="addclass_name"
			>
				<b-form-select
					:options="courses"
					size="lg"
					class="mt-3"
					value-field="id"
					text-field="name"
					v-model="newpayement.class_id"
				></b-form-select>
			</b-form-group>

			<br />
			<br />

			<b-button
				@click="addnewpayemnt(newpayement.id)"
				style="float: right"
				size="lg"
				variant="success"
				>save payement</b-button
			>
			<button @click="ahmed">babydoyou</button>
			<b-button
				@click="canceladdingsnewpayement"
				style="float: left"
				size="lg"
				variant="success"
				>cancel</b-button
			>
		</b-modal>
		<b-table striped hover :items="payements" :fields="fields">
			<template #cell(actions)="row">
				<b-button
					size="lg"
					@click="updateclass(row.item, row.index, $event.target)"
					class="btn btn-success"
					v-b-modal.updatestudent
				>
					update
				</b-button>
				<b-button
					size="lg"
					@click="deleteclass(row.item, row.index, $event.target)"
					class="btn btn-danger"
				>
					delete
				</b-button>
			</template>
		</b-table>
		<b-modal
			no-close-on-backdrop="false"
			hide-header-close="false"
			no-close-on-esc="false"
			hide-footer="false"
			size="lg"
			id="updatepayement"
		>
			<b-form-group
				id="payement_name"
				label="	payement_name:"
				label-for="	payement_name"
			>
				<b-form-input
					id="payement_name"
					type="text"
					placeholder="Enter payement_name"
					v-model="newpayement.payement_name"
					required
				></b-form-input>
			</b-form-group>
			<b-form-group id="amount" label="amount:" label-for="amount">
				<b-form-input
					id="amount"
					type="number"
					placeholder="Enter amount"
					v-model="newpayement.amount"
					required
					min="1"
				></b-form-input>
			</b-form-group>
			<b-form-group id="class_name" label="class_name:" label-for="class_name">
				<b-form-select
					:options="courses"
					size="lg"
					class="mt-3"
					value-field="id"
					text-field="name"
					v-model="newpayement.class_id"
				></b-form-select>
			</b-form-group>

			<br />
			<br />

			<b-button
				@click="updateexsitingpayement(newpayement.id)"
				style="float: right"
				size="lg"
				variant="success"
				>update payement</b-button
			>

			<b-button
				@click="cancelupdating"
				style="float: left"
				size="lg"
				variant="success"
				>cancel</b-button
			>
		</b-modal>
	</div>
</template>
<script lang="js">
import axios from "axios";
import { setHeaderAuth } from "/src/axios.js";
import Swal from "sweetalert2";

export default {
  name: 'payement',
  data() {
      return {
          courses:[],
          newpayement:
          {
              id:null,
              	payement_name:null,
                  	amount:null,
                      class_id:null,
          },
          payements:[],
          fields: [
				{ key: "id", label: "id" },
				{
					key: "payement_name",
					label: "payement_name",
					sortable: true,
					sortDirection: "desc",
				},
                {
					key: "amount",
					label: "fees_amount",
					sortable: true,
					sortDirection: "desc",
				},
                 {
					key: "class_id",
					label: "class_id",
					sortable: true,
					sortDirection: "desc",
				},

				{
					key: "actions",
					label: "actions",
				},
			],
         
      }
  },
 created() {
     setHeaderAuth();
  axios.get("payemnts").then((res)=>
  {
      this.payements=res.data
  })
  axios.get("courses").then((res)=>
  {
     this.courses=res.data
  })
 },
 
 methods: {
     deleteclass(row)
     {
        setHeaderAuth();
 	axios.delete("payemnts/" + row.id).then((res) => {
				console.log(res);

				this.payements = this.payements.filter((e) => e.id !== row.id);
				Swal.fire(
					"Good job!",
					"payemnt has been deleted sucessfully",
					"success"
				);
			});
     },
     updateclass(row)
     {
           this.$bvModal.show("updatepayement");
           let updatedpayemnt = this.payements.filter((e) => e.id == row.id);
			
			this.newpayement.id = updatedpayemnt[0].id;
			this.newpayement.payement_name = updatedpayemnt[0].payement_name;
			this.newpayement.amount = updatedpayemnt[0].amount;
            	this.newpayement.class_id = updatedpayemnt[0].class_id;

     },
     cancelupdating()
     {
this.$bvModal.hide("updatepayement");
this.newpayement.id=""
this.newpayement.payement_name =""
this.newpayement.class_id=""
this.newpayement.amount=""
     },
updateexsitingpayement(id)
{
    setHeaderAuth();
			axios.put("payemnts/" + id, this.newpayement).then((res) => {
				console.log(res);

				this.payements.forEach((item, index) => {
					if (item.id === id) {
						this.items[index] = res.data;
						item.payement_name = res.data.payement_name;
						item.amount = res.data.amount;
                       item.class_id = res.data.class_id;

						this.$bvModal.hide("updatepayement");
						Swal.fire(
							"Good job!",
							"payement has been updated sucessfully",
							"success"
						);
						this.newpayement.id = "";
						this.newpayement.payement_name = "";
                    	this.newpayement.amount = "";
						this.newpayement.class_id = "";

					}
				});
			});
	

},
addnewclass()
{
   this.$bvModal.show("addnewpayement");
},
addnewpayemnt()
{
        setHeaderAuth();
axios.post("payemnts",this.newpayement).then((res)=>
{
   this.payements.push(res.data);
				Swal.fire("Good job!", "student has been added sucessfully", "success");
				this.$bvModal.hide("addnewpayement");
				this.newpayement.id = "";
				this.newpayement.payement_name = "";
                this.newpayement.amount = "";
                 this.newpayement.class_id = "";
			
})

},
 
 },
 canceladdingsnewpayement()
 {
     alert("asd")
 },
 ahmed()
 {
 }
}
</script>
<style>
</style>