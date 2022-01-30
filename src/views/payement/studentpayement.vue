<template>
	<div>
		<b-modal
			no-close-on-backdrop="fasle"
			hide-header-close="false"
			no-close-on-esc="false"
			hide-footer="false"
			size="lg"
			id="studentpaement"
		>
			<div style="text-align: center">
				<p style="background: #4caf50; font-size: 25px">
					make a successfull payement
				</p>
			</div>

			<b-form-group
				id="student_payemnt"
				label="payement_type:"
				label-for="student_payemnt"
			>
				<b-form-select
					:options="payement_types"
					size="lg"
					class="mt-3"
					value-field="id"
					text-field="payement_name"
					label-class="font-weight-bold pt-0"
					v-model="new_payement.payement_id"
				></b-form-select>
			</b-form-group>
			<br />
			<br />

			<b-button
				@click="makenewpayment(row)"
				style="float: right"
				size="lg"
				variant="success"
				>save student</b-button
			>

			<b-button
				@click="canceladdings"
				style="float: left"
				size="lg"
				variant="success"
				>cancel</b-button
			>
		</b-modal>
		<div class="row">
			<div class="col-6">
				<b-form-group
					id="student_payement"
					label="class:"
					label-for="student_payement"
				>
					<b-form-select
						:options="classeslist"
						size="lg"
						class="mt-3"
						value-field="id"
						text-field="name"
						v-model="class_selected"
					></b-form-select>
				</b-form-group>
			</div>
			<div class="col-6">
				<b-form-group
					id="student_name"
					label="student_name:"
					label-for="student_name"
				>
					<v-select
						@search="getstufdentsname"
						v-model="selected_name"
						:options="students_options"
						:reduce="(option) => option.id"
						label="name"
					></v-select>
				</b-form-group>
			</div>
		</div>
		<b-table striped hover :items="items" :fields="fields">
			<template #cell(actions)="row">
				<i class="fa fa-cc-visa" style="font-size: 48px; color: red">
					<b-button size="lg" @click="makepayemnt(row)" class="btn btn-success">
						pay
					</b-button>
				</i>
			</template>
		</b-table>
	</div>
</template>
<script>
import axios from "axios";

// import axios from "axios";
// import VueSweetalert2 from "vue-sweetalert2";
import Swal from "sweetalert2";

import { setHeaderAuth } from "/src/axios.js";

export default {
	name: "studentpayement",
	data: function () {
		return {
			selected_name: null,
			students_options: [],
			new_payement: {
				id: null,
				student_id: null,
				class_id: null,
				payement_id: null,
				student_name: null,
			},
			payement_type: null,
			class_selected: null,
			classeslist: [],
			payement_types: [],
			items: [],
			query: null,
			fields: [
				{ key: "student_id", label: "id" },
				{
					key: "student_name",
					label: "student_name",
					sortable: true,
					sortDirection: "desc",
				},
				{
					key: "class_name",
					label: "class_name",
					sortable: true,
					sortDirection: "desc",
				},

				{
					key: "actions",
					label: "actions",
				},
			],
		};
	},
	created() {
		setHeaderAuth();
		axios.get("courses").then((res) => {
			this.classeslist = res.data;
		});
		axios.get("payemnts").then((res) => {
			this.payement_types = res.data;
		});
	},
	methods: {
		makepayemnt(row) {
			this.new_payement.class_id = row.item.class_id;
			this.new_payement.student_name = row.item.student_name;
			this.new_payement.student_id = row.item.student_id;
			console.log(this.new_payement);
			this.$bvModal.show("studentpaement");
		},
		canceladdings() {
			this.$bvModal.hide("studentpaement");
		},
		getstufdentsname(search) {
			if (search.length > 3) {
				setHeaderAuth();
				axios.post("getsearchsedstudent", { name: search }).then((res) => {
					this.students_options = res.data;
				});
			}
		},
		makenewpayment() {
			setHeaderAuth();
			axios
				.post("storepayement", {
					student_id: this.new_payement.student_id,
					class_id: this.new_payement.class_id,
					payement_id: this.new_payement.payement_id,
					student_name: this.new_payement.student_name,
				})
				.then(() => {
					Swal.fire(
						"Good job!",
						"student has been payed sucessfully",
						"success"
					);
					this.new_payement.student_id = "";
					this.new_payement.class_id = "";
					this.new_payement.payement_id = "";
					this.new_payement.student_name = "";
					this.$bvModal.hide("studentpaement");
				})
				.catch(() => {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Something went wrong!",
						footer: '<a href="">Why do I have this issue?</a>',
					});
					this.new_payement.student_id = "";
					this.new_payement.class_id = "";
					this.new_payement.payement_id = "";
					this.new_payement.student_name = "";
					this.$bvModal.hide("studentpaement");
				});
		},
	},
	watch: {
		class_selected(val) {
			setHeaderAuth();
			axios.get("getstudents?id=" + val).then((res) => {
				this.items = res.data;
			});
		},
		selected_name(val) {
			axios.get("getstudentdetails?id=" + val).then((res) => {
				this.items = res.data;
			});
		},
	},
};
// @ is an alias to /src
</script>
<style>
</style>