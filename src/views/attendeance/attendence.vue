<template>
	<div>
		<div class="headersd">
			<strong class="daly">daily_attendance</strong>
		</div>
		<b-button
			@click="send_attendece"
			size="lg"
			style="float: right"
			variant="success"
			>take attendance</b-button
		>

		<br />
		<div class="row">
			<div class="col-4">
				<b-form-group id="teacher" label="teacher:" label-for="teacher">
					<b-form-select
						size="lg"
						class="mt-3"
						value-field="id"
						text-field="name"
					></b-form-select>
				</b-form-group>
			</div>
			<div class="col-4">
				<b-form-group id="class" label="class:" label-for="class">
					<b-form-select
						size="lg"
						class="mt-3"
						value-field="id"
						text-field="name"
						:options="classes"
						v-model="select_class"
					></b-form-select>
				</b-form-group>
			</div>
			<div class="col-4">
				<b-form-group id="section" label="section:" label-for="section">
					<b-form-select
						size="lg"
						class="mt-3"
						value-field="id"
						text-field="name"
					></b-form-select>
				</b-form-group>
			</div>
		</div>

		<b-table striped hover :items="students" :fields="fields">
			<template #cell(actions)="row">
				{{ row.item.id }}
				<toggle-button
					color="#37474f"
					:width="70"
					:height="30"
					:labels="true"
					:value="true"
					@change="ok(row, $event)"
				/>
			</template>
		</b-table>
	</div>
</template>
<script>
// @ is an alias to /src
import axios from "axios";

// // import axios from "axios";
// // import VueSweetalert2 from "vue-sweetalert2";
// import Swal from "sweetalert2";

import { setHeaderAuth } from "/src/axios.js";

export default {
	name: "attendence",
	data: function () {
		return {
			classes: [],
			select_class: "",
			checkabsence: null,
			students: [],

			checkedCategories: false,
			defaluttric: true,
			options: [
				{ text: "Orange", value: "orange" },
				{ text: "Apple", value: "apple" },
				{ text: "Pineapple", value: "pineapple" },
				{ text: "Grape", value: "grape" },
			],
			fields: [
				{ key: "id", label: "id" },
				{
					key: "name",
					label: "student_name",
					sortable: true,
					sortDirection: "desc",
				},
				{
					key: "course_id",
					label: "class_id",
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
	watch: {
		select_class(val) {
			if (val) {
				setHeaderAuth();
				axios.get("getstudentclass?id=" + val).then((res) => {
					this.students = res.data;
				});
			}
		},
		checkabsence(val) {
			alert(val);
		},
	},

	created: function () {
		setHeaderAuth();
		axios.get("courses").then((res) => {
			this.classes = res.data;
		});
	},
	methods: {
		send_attendece() {},

		ok(row, e) {
			setHeaderAuth();
			console.log(row.item.id);
			console.log(e.value);
			axios
				.post("absent", {
					Student_id: row.item.id,
					class_id: row.item.course_id,
					absence_status: e.value,
				})
				.then((res) => {
					console.log(res);
				});
		},
	},
};
</script>
<style>
/* .attendsselectclass {
	width: 400px;
	align: center;
} */
.daly {
	color: #fff;
	display: inline-block;
	/* float:left;  remove */
	margin: 10px 10px 5px 0;
	padding: 5px 10px;
	font-size: 20px;
}
.headersd {
	width: 40%;
	margin-left: 400px;
	background: red;
	overflow: hidden;
	text-align: center;
}
</style>