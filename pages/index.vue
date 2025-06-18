<script setup lang="ts">
import { ref, computed } from "vue"
import InputText from "primevue/inputtext"
import { useToast } from "primevue/usetoast"
import { useRouter } from "vue-router"
import { foodList } from "~/lib/foodList"

const toast = useToast()
const router = useRouter()

const username = ref("")
const room = ref("")
const touched = ref({
	username: false,
	room: false
})
const serverSideStreaming = ref(false)

const isUsernameValid = computed(
	() => username.value.trim().length > 0 && username.value.trim().length <= 30
)
const isRoomValid = computed(
	() => room.value.trim().length > 0 && room.value.trim().length <= 30
)
const showUsernameValidation = computed(
	() => touched.value.username && !isUsernameValid.value
)
const showRoomValidation = computed(
	() => touched.value.room && !isRoomValid.value
)

function setUsernameTouched() {
	touched.value.username = true
}
function setRoomTouched() {
	touched.value.room = true
}

async function showError(summary: string, detail: string) {
	toast.add({
		severity: "error",
		summary,
		detail,
		life: 3000
	})
}

async function joinRoom() {
	if (!isUsernameValid.value || !isRoomValid.value) return

	const res = await fetch(
		`/api/livekit/roomCheck?roomName=${room.value.trim()}&username=${username.value.trim()}`
	)

	if (!res.ok) {
		await showError(
			"Network Error",
			"Error occurred while checking if server exists."
		)
		return
	}

	const data = await res.json()

	if (!data.roomExist) {
		await showError("Error joining room", "Room does not exist")
		return
	}

	if (!data.usernameAvailable) {
		await showError("Error joining room", "Username taken")
		return
	}

	router.push({
		path: "/room",
		query: {
			username: username.value.trim(),
			room: room.value.trim(),
			isHost: "false"
		}
	})
}

async function hostRoom() {
	if (!room.value) {
		room.value = foodList[Math.floor(Math.random() * foodList.length)]
	} else {
		const res = await fetch(
			`/api/livekit/roomCheck?roomName=${room.value.trim()}&username=${username.value.trim()}`
		)
		if (!res.ok) {
			await showError(
				"Network Error",
				"Error occurred while checking if server exists."
			)
			return
		}
		const data = await res.json()
		if (data.roomExist) {
			await showError("Error Creating Room", "Room Already Exists")
			return
		}
	}

	if (!username.value) {
		username.value = foodList[Math.floor(Math.random() * foodList.length)]
	}

	if (!isUsernameValid.value || !isRoomValid.value) return

	router.push({
		path: "/room",
		query: {
			username: username.value.trim(),
			room: room.value.trim(),
			isHost: "true",
			serverSideStreaming: serverSideStreaming.value.toString()
		}
	})
}
</script>

<template>
	<Toast />
	<Navbar class="absolute left-0 top-0" />
	<div class="flex h-screen items-center justify-center bg-[#82d2e8]">
		<TabView class="shadow-2xl">
			<TabPanel header="Join Room">
				<div
					class="flex h-[350px] w-[500px] flex-col items-center justify-center"
				>
					<form
						v-focustrap
						@submit.prevent="joinRoom"
						class="flex w-3/6 flex-col items-center gap-8 text-white"
					>
						<div class="flex flex-col gap-2">
							<div class="w-full">
								<label for="username">Username</label>
								<InputText
									autofocus
									class="w-full"
									id="joinroom-username"
									v-model="username"
									@focus="setUsernameTouched"
									aria-describedby="username-help"
								/>
								<!-- Validation message for username -->
								<p v-if="showUsernameValidation" class="text-sm text-red-500">
									Username must be between 1 and 30 characters.
								</p>
							</div>
							<div class="w-full">
								<label for="room">Room</label>
								<InputText
									class="w-full"
									id="joinroom-room"
									v-model="room"
									@focus="setRoomTouched"
									aria-describedby="room-help"
								/>
								<!-- Validation message for room -->
								<p v-if="showRoomValidation" class="text-sm text-red-500">
									Room name must be between 1 and 30 characters.
								</p>
							</div>
						</div>
						<!-- Submit button -->
						<Button
							label="Join Room"
							type="submit"
							:disabled="!isUsernameValid || !isRoomValid"
							class="h-12 w-32 cursor-pointer rounded-md bg-[rgb(99,160,177)] text-black"
						/>
					</form>
				</div>
			</TabPanel>
			<TabPanel header="Host Room">
				<div
					class="flex h-[350px] w-[500px] flex-col items-center justify-center"
				>
					<form
						v-focustrap
						@submit.prevent="hostRoom"
						class="flex w-3/6 flex-col items-center gap-4 text-white"
					>
						<div class="flex items-center justify-end gap-2">
							<div>
								Server Side Streaming
								<input type="checkbox" v-model="serverSideStreaming" />
							</div>
						</div>
						<div class="flex flex-col gap-2">
							<div class="w-full">
								<label for="username">Username</label>
								<InputText
									autofocus
									class="w-full"
									id="hostroom-username"
									v-model="username"
									@focus="setUsernameTouched"
									aria-describedby="username-help"
								/>
								<!-- Validation message for username -->
								<p v-if="showUsernameValidation" class="text-sm text-red-500">
									Username must be between 1 and 30 characters.
								</p>
							</div>
							<div class="w-full">
								<label for="room">Room</label>
								<InputText
									class="w-full"
									id="hostroom-room"
									v-model="room"
									@focus="setRoomTouched"
									aria-describedby="room-help"
								/>
								<!-- Validation message for room -->
								<p v-if="showRoomValidation" class="text-sm text-red-500">
									Room name must be between 1 and 30 characters.
								</p>
							</div>
						</div>
						<Button
							label="Host Room"
							type="submit"
							class="h-12 w-32 cursor-pointer rounded-md bg-[rgb(99,160,177)] text-black"
						/>
					</form>
				</div>
			</TabPanel>
		</TabView>
	</div>
</template>

<style>
/* Ensures the tab headers fill the entire width of the tab panel container */
.p-tabview-nav li {
	width: 100%;
}

.p-tabview-nav li a span {
	width: 100%;
	text-align: center;
}

.p-tabview-nav-content {
	border-top-right-radius: 6px;
	border-top-left-radius: 6px;
	background-color: #1f2937;
}

.p-button-label {
	font-weight: 400;
}
</style>
