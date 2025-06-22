import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	RoomCheck,
	GenerateTokenForHostRoom,
	GenerateTokenForJoinRoom,
	GetUsersInRoom,
} from "../../../lib/signaling-server";
import * as signaling from "../../../lib/signaling-server";

const mockBaseUrl = "http://localhost:3000";

describe("RoomCheck", () => {
	beforeEach(() => {
		signaling.setApiBase(mockBaseUrl);
	});

	it("calls fetch with the correct URL", async () => {
		const mockFetch = vi.fn(() => Promise.resolve(new Response("{}")));
		globalThis.fetch = mockFetch;

		const username = "testuser";
		const roomname = "testroom";
		await RoomCheck(username, roomname);

		expect(mockFetch).toHaveBeenCalledWith(
			`${mockBaseUrl}/api/livekit/roomCheck?roomName=${roomname}&username=${username}`,
		);
	});
});

describe("GenerateTokenForHostRoom", () => {
	beforeEach(() => {
		signaling.setApiBase(mockBaseUrl);
	});

	it("calls fetch with the correct URL and method", async () => {
		const mockFetch = vi.fn(() => Promise.resolve(new Response("{}")));
		globalThis.fetch = mockFetch;

		const username = "hostuser";
		const roomname = "hostroom";
		await GenerateTokenForHostRoom(username, roomname);

		expect(mockFetch).toHaveBeenCalledWith(
			expect.stringContaining(
				`${mockBaseUrl}/api/livekit/generateTokenForHostRoom?`,
			),
			{ method: "GET" },
		);
	});
});

describe("GenerateTokenForJoinRoom", () => {
	beforeEach(() => {
		signaling.setApiBase(mockBaseUrl);
	});

	it("calls fetch with the correct URL and method", async () => {
		const mockFetch = vi.fn(() => Promise.resolve(new Response("{}")));
		globalThis.fetch = mockFetch;

		const username = "joinuser";
		const roomname = "joinroom";
		await GenerateTokenForJoinRoom(username, roomname);

		expect(mockFetch).toHaveBeenCalledWith(
			expect.stringContaining(
				`${mockBaseUrl}/api/livekit/generateTokenForJoinRoom?`,
			),
			{ method: "GET" },
		);
	});
});

describe("GetUsersInRoom", () => {
	beforeEach(() => {
		signaling.setApiBase(mockBaseUrl);
	});

	it("calls fetch with the correct URL and method", async () => {
		const mockFetch = vi.fn(() => Promise.resolve(new Response("{}")));
		globalThis.fetch = mockFetch;

		const roomname = "usersroom";
		await GetUsersInRoom(roomname);

		expect(mockFetch).toHaveBeenCalledWith(
			`${mockBaseUrl}/api/livekit/getUsersInRoom?roomName=${roomname}`,
			{ method: "GET" },
		);
	});
});
