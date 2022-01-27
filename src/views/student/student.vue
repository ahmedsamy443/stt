<template>
	<div>
		<b-button
			@click="addnewstudent"
			style="float: right"
			size="lg"
			variant="success"
			>add new student</b-button
		>

		<b-table striped hover :items="items" :fields="fields">
			<template #cell(actions)="row">
				<b-button
					size="lg"
					@click="updatestudent(row.item, row.index, $event.target)"
					class="btn btn-success"
					v-b-modal.updatestudent
				>
					update
				</b-button>
				<b-button
					size="lg"
					@click="deltestudent(row.item, row.index, $event.target)"
					class="btn btn-danger"
				>
					delete
				</b-button>
			</template>
		</b-table>
		<b-modal
			no-close-on-backdrop="fasle"
			hide-header-close="false"
			no-close-on-esc="false"
			hide-footer="false"
			size="lg"
			id="savestudent"
		>
			<b-form-group
				id="student_name"
				label="student_name:"
				label-for="student_name"
			>
				<b-form-input
					id="student_name"
					type="text"
					placeholder="Enter student_name"
					v-model="newstudent.name"
					required
				></b-form-input>
			</b-form-group>
			<b-form-group
				id="student_class"
				label="student_class:"
				label-for="student_class"
			>
				<b-form-select
					:options="student_classes"
					size="lg"
					class="mt-3"
					value-field="id"
					text-field="name"
					v-model="newstudent.course_id"
				></b-form-select>
			</b-form-group>
			<br />
			<br />

			<b-button
				@click="addnewstudent2"
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
		<b-modal
			hide-footer="false"
			hide-header-close="false"
			no-close-on-backdrop="fasle"
			no-close-on-esc="false"
			size="lg"
			id="updatestudent"
		>
			<div class="attent">
				<span class="student_allert"
					>be attention you are updating student info
				</span>
			</div>

			<b-form-group
				id="student_name"
				label="student_name:"
				label-for="student_name"
			>
				<b-form-input
					id="student_name"
					type="text"
					placeholder="Enter student_name"
					v-model="newstudent.name"
					required
				></b-form-input>
			</b-form-group>
			<b-form-group
				id="student_class"
				label="student_class:"
				label-for="student_class"
			>
				<b-form-select
					:options="student_classes"
					size="lg"
					class="mt-3"
					value-field="id"
					text-field="name"
					v-model="newstudent.course_id"
				></b-form-select>
			</b-form-group>
			<br />
			<br />
			<b-button
				@click="updatestudentsucc(newstudent.id)"
				style="float: right"
				size="lg"
				variant="success"
				>update student</b-button
			>
			<b-button
				@click="cancelupdateing"
				style="float: left"
				size="lg"
				variant="success"
				>cancel</b-button
			>
		</b-modal>
	</div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

// import axios from "axios";
// import VueSweetalert2 from "vue-sweetalert2";
import Swal from "sweetalert2";

import { setHeaderAuth } from "/src/axios.js";

export default {
	name: "student",
	data: function () {
		return {
			newstudent: {
				id: "",
				name: "",
				course_id: "",
			},
			items: [],
			class_selected: null,
			student_classes: [],
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

	created: function () {
		setHeaderAuth();
		axios.get("students").then((res) => {
			console.log(res);
			this.items = res.data;
		});
		axios.get("courses").then((res) => {
			this.student_classes = res.data;
		});
	},
	methods: {
		deltestudent(row) {
			setHeaderAuth();
			axios.delete("students/" + row.id).then((res) => {
				console.log(res);

				this.items = this.items.filter((e) => e.id !== row.id);
				Swal.fire(
					"Good job!",
					"student has been deleted sucessfully",
					"success"
				);
			});
		},
		updatestudent(row) {
			let updatedstudent = this.items.filter((e) => e.id == row.id);
			console.log(updatedstudent);
			this.newstudent.name = updatedstudent[0].name;
			this.newstudent.id = updatedstudent[0].id;
			this.newstudent.course_id = updatedstudent[0].course_id;
		},
		addnewstudent() {
			this.$bvModal.show("savestudent");
		},
		cancelupdateing() {
			this.$bvModal.hide("updatestudent");
			this.newstudent.id = "";
			this.newstudent.name = "";
			this.newstudent.course_id = "";
		},
		canceladdings() {
			this.$bvModal.hide("savestudent");
			this.newstudent.id = "";
			this.newstudent.name = "";
			this.newstudent.course_id = "";
		},
		addnewstudent2() {
			setHeaderAuth();
			axios.post("student", this.newstudent).then((res) => {
				this.items.push(res.data);
				Swal.fire("Good job!", "student has been added sucessfully", "success");
				this.$bvModal.hide("savestudent");
				this.newstudent.id = "";
				this.newstudent.name = "";
				this.newstudent.course_id = "";
			});
		},
		updatestudentsucc(id) {
			setHeaderAuth();
			axios.put("students/" + id, this.newstudent).then((res) => {
				console.log(res);

				this.items.forEach((item, index) => {
					if (item.id === id) {
						this.items[index] = res.data;
						item.name = res.data.name;
						item.course_id = res.data.course_id;
						this.$bvModal.hide("updatestudent");
						Swal.fire(
							"Good job!",
							"student has been updated sucessfully",
							"success"
						);
						this.newstudent.course_id = "";
						this.newstudent.name = "";
					}
				});
			});
		},
	},
};
</script>
<style   >
.student_allert {
	color: #fff;
	display: inline-block;
	/* float:left;  remove */
	margin: 10px 10px 5px 0;
	padding: 5px 10px;
	font-size: 20px;
}
.attent {
	background: red;
	overflow: hidden;
	text-align: center;
}
</style>
