<template>
	<div>
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
					<b-button
						v-b-modal.history_payements
						size="lg"
						@click="historypayement(row)"
						class="btn btn-success"
					>
						showpayement
					</b-button>
				</i>
			</template>
		</b-table>

		<b-modal size="xl" id="history_payements" title="payement_details">
			<div style="text-align: center">
				<strong>payements</strong>
			</div>

			<hr />
			<strong> student_name : {{ student_name }}</strong
			><br />
			<strong> class_name : {{ class_name }}</strong>
			<br />
			<hr />
			<table class="wborder">
				<tr>
					<td
						style="border: 1px solid black; padding: 0px 10px 0px 10px"
						width="50%"
					>
						<p><b>Fee Details</b></p>
						<hr />
						<table width="100%">
							<tr>
								<td width="50%">Fee Type</td>
								<td width="50%" class="text-right">Amount</td>
							</tr>

							<tr>
								<th>Total</th>
								<th class="text-right">
									<b>{{ sum }}</b>
								</th>
							</tr>
						</table>
					</td>
					<td
						style="border: 1px solid black; padding: 5px 10px 5px 10px"
						width="50%"
					>
						<p><b>Payment Details</b></p>
						<table width="100%" class="wborder">
							<tr>
								<td width="50%">Date</td>
								<td>payemnt_type</td>
								<td width="50%" class="text-right">Amount</td>
							</tr>

							<tr v-for="detail in student_details" :key="detail.id">
								<td>
									<b>{{ detail.payement_date }}</b>
								</td>
								<td>
									<b>{{ detail.payements.payement_name }}</b>
								</td>
								<td class="text-right">
									<b>{{ detail.payements.amount }}</b>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</b-modal>
	</div>
</template>
<script>
import axios from "axios";
import { setHeaderAuth } from "/src/axios.js";

export default {
	name: "payement_reports",
	data: function () {
		return {
			classeslist: [],
			class_selected: null,
			selected_name: null,
			students_options: [],
			student_details: [],
			student_name: null,
			class_name: null,
			sum: null,
			items: [],
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
	},
	methods: {
		getstufdentsname(search) {
			if (search.length > 3) {
				setHeaderAuth();
				axios.post("getsearchsedstudent", { name: search }).then((res) => {
					this.students_options = res.data;
				});
			}
		},
		historypayement(row) {
			setHeaderAuth();
			axios
				.get(
					"getstudentdetails?student_id=" +
						row.item.id +
						"&class_id=" +
						row.item.course_id
				)
				.then((res) => {
					this.student_details = res.data.student_details;
					this.student_name = res.data.student_name;
					this.class_name = res.data.class_name;
					this.sum = res.data.sum;
				});
		},
	},
	watch: {
		class_selected(val) {
			setHeaderAuth();
			axios.get("getallstudents?id=" + val).then((res) => {
				this.items = res.data;
			});
		},
	},
};
</script>
<style>
.flex {
	display: inline-flex;
	width: 100%;
}
.w-50 {
	width: 50%;
}
.text-center {
	text-align: center;
}
.text-right {
	text-align: right;
}
table.wborder {
	width: 100%;
	border-collapse: collapse;
}
table.wborder > tbody > tr,
table.wborder > tbody > tr > td {
	border: 1px solid;
}
p {
	margin: unset;
}
</style>