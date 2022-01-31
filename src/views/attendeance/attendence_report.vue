<template>
	<div>
		<div class="row">
			<div class="col-3">
				<b-form-group id="class" label="class:" label-for="class">
					<b-form-select
						size="lg"
						class="mt-3"
						value-field="id"
						text-field="name"
						:options="class_lists"
						v-model="select_class"
					></b-form-select>
				</b-form-group>
			</div>
			<div class="col-3">
				<div>
					<label for="example-datepicker">Choose a start date</label><br />
					<input v-model="start_date" class="form-control" type="date" />
				</div>
			</div>
			<div class="col-3">
				<div>
					<label for="example-datepicker">Choose end date</label><br />
					<input v-model="end_date" class="form-control" type="date" />
				</div>
			</div>
			<div class="col-3">
				<button
					@click="search"
					style="margin-top: 20px"
					class="btn btn-success"
				>
					search
				</button>
			</div>
			<br />
			<br />
		</div>
		<b-table striped hover :items="absent_students" :fields="fields"> </b-table>
	</div>
</template>
<script>
import axios from "axios";

// import axios from "axios";
// import VueSweetalert2 from "vue-sweetalert2";

import { setHeaderAuth } from "/src/axios.js";

export default {
	name: "attendence_report",
	data: function () {
		return {
			start_date: null,
			end_date: null,
			absent_students: [],
			class_lists: [],
			selected_date: null,
			select_class: null,
			fields: [
				{ key: "Student_id", label: "Student_id" },
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
					key: "Attendance_date",
					label: "Attendance_date",
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
		axios.get("getabsentstuents").then((res) => {
			this.absent_students = res.data;
		});
		axios.get("courses").then((res) => {
			this.class_lists = res.data;
		});
	},
	methods: {
		search() {
			setHeaderAuth();
			if (this.select_class == null) {
				axios
					.get(
						"getabbentstudentsbydate?start_date=" +
							this.start_date +
							"&end_date=" +
							this.end_date
					)
					.then((res) => {
						this.absent_students = res.data;
						this.select_class = "";
						this.start_date = "";
						this.end_date = "";
					});
			} else {
				axios
					.get(
						"getabbentstudentsbydate?start_date=" +
							this.start_date +
							"&end_date=" +
							this.end_date +
							"&class_id=" +
							this.select_class
					)
					.then((res) => {
						this.absent_students = res.data;
						this.select_class = "";
						this.start_date = "";
						this.end_date = "";
					});
			}
		},
	},
	watch: {
		select_class(val) {
			setHeaderAuth();
			axios.get("getabsentstuentsbyclass?id=" + val).then((res) => {
				this.absent_students = res.data;
			});
		},
	},
};
// @ is an alias to /src
</script>
