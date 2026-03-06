import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLiveKit } from "~/composables/useLiveKit";
import * as signalingServer from "~/lib/signaling-server";

describe("useLiveKit", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("fetchToken returns token for host", async () => {
		const mockToken = "host-token";
		vi.spyOn(signalingServer, "GenerateTokenForHostRoom").mockResolvedValue({
			ok: true,
			json: async () => ({ token: mockToken }),
		} as Response);

		const { fetchToken, token } = useLiveKit();
		const result = await fetchToken("room1", "hostUser", true);

		expect(result).toEqual({ token: mockToken });
		expect(token.value).toBe(mockToken); // Enforce token is set
	});

	it("fetchToken returns token and participant info for joiner", async () => {
		const mockData = {
			host: "hostUser",
			token: "join-token",
			participantNames: ["hostUser", "joinUser"],
		};
		vi.spyOn(signalingServer, "GenerateTokenForJoinRoom").mockResolvedValue({
			ok: true,
			json: async () => mockData,
		} as Response);

		const { fetchToken, token } = useLiveKit();
		const result = await fetchToken("room1", "joinUser", false);

		expect(result).toEqual(mockData);
		expect(token.value).toBe(mockData.token); // Enforce token is set
	});

	it("fetchToken returns error if username is taken", async () => {
		vi.spyOn(signalingServer, "GenerateTokenForJoinRoom").mockResolvedValue({
			ok: true,
			json: async () => ({ token: "", statusCode: 409 }),
		} as Response);

		const { fetchToken } = useLiveKit();
		const result = await fetchToken("room1", "takenUser", false);

		expect(result).toEqual({ error: "Username is Taken" });
	});

	it("fetchToken returns error on failed response", async () => {
		vi.spyOn(signalingServer, "GenerateTokenForHostRoom").mockResolvedValue({
			ok: false,
			status: 500,
			json: async () => ({}),
		} as Response);

		const { fetchToken } = useLiveKit();
		const result = await fetchToken("room1", "hostUser", true);

		expect(result).toEqual({
			error: "Error fetching token: HTTP request status 500",
		});
	});
});
