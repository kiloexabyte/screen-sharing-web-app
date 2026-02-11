package commands

import (
	"crypto/sha256"
	"encoding/hex"
	"os"
)

var pnpmCachePaths = []string{"node_modules"}

func pnpmCacheKey() string {
	data, err := os.ReadFile("pnpm-lock.yaml")
	if err != nil {
		return "node-modules-fallback"
	}
	hash := sha256.Sum256(data)
	return "node-modules-" + hex.EncodeToString(hash[:8])
}
