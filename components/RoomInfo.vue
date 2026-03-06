<script setup lang="ts">
import { inject } from "vue";

defineProps<{
	roomName: string;
	usernames: string[];
	username: string;
	host: string;
	isHost: string;
	usingSFU: boolean;
}>();

type ToggleStreamFunction = () => void;
type LeaveRoomFunction = () => void;
type ToggleChatFunction = () => void;

const toggleStream = inject<ToggleStreamFunction>("handleToggleStream");
const leaveRoom = inject<LeaveRoomFunction>("leaveRoom");
const toggleChat = inject<ToggleChatFunction>("ToggleChat");
</script>

<template>
	<div class="flex h-full items-center justify-between pl-4">
		<div class="flex h-full items-center gap-3">
			<RoomInfoSlot title="Room">
				<span class="text-black"> {{ roomName }}</span>
			</RoomInfoSlot>

			<RoomInfoSlot title="Username">
				<span class="text-black"> {{ username }}</span>
			</RoomInfoSlot>

			<RoomInfoSlot title="Host">
				<span class="text-black"> {{ host }}</span>
			</RoomInfoSlot>

			<RoomUserList :users="usernames" />
		</div>

		<div class="flex flex-row items-center gap-5 pr-3">
			<div v-if="usingSFU && isHost === 'true'">Server-side streaming</div>
			<div v-if="!usingSFU && isHost === 'true'">P2p streaming</div>
			<Button severity="info" outlined @click="toggleChat"> Hide Chat</Button>
			<Button v-if="isHost === 'true'" outlined @click="toggleStream"
				>Stream</Button
			>
			<Button severity="danger" outlined @click="leaveRoom">Leave Room</Button>
		</div>
	</div>
</template>
