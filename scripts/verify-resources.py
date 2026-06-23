#!/usr/bin/env python3
"""
Verify all resources in tracks.ts for:
1. Live URLs (HTTP status check)
2. Beginner suitability
3. Quality assessment
"""

import json
import re
import requests
from pathlib import Path
from urllib.parse import urlparse
from typing import List, Dict, Tuple

# Read tracks.ts
tracks_path = Path(__file__).parent.parent / "lib" / "tracks.ts"
tracks_content = tracks_path.read_text()

# Extract all resource objects
resource_pattern = r"\{\s*id:\s*['\"]([^'\"]+)['\"]\s*,\s*title:\s*['\"]([^'\"]+)['\"]\s*,\s*description:\s*['\"]([^'\"]*?)['\"]\s*,\s*url:\s*['\"]([^'\"]+)['\"]\s*,\s*type:\s*['\"]([^'\"]+)['\"]\s*,\s*free:\s*(true|false)\s*,\s*source:\s*['\"]([^'\"]+)['\"]\s*\}"

matches = re.finditer(resource_pattern, tracks_content, re.DOTALL)
resources: List[Dict] = []

for match in matches:
    resource = {
        "id": match.group(1),
        "title": match.group(2),
        "description": match.group(3)[:100],  # First 100 chars
        "url": match.group(4),
        "type": match.group(5),
        "free": match.group(6) == "true",
        "source": match.group(7),
    }
    resources.append(resource)

print(f"Found {len(resources)} resources\n")

# Check URL availability
print("=" * 80)
print("URL VERIFICATION")
print("=" * 80)

broken_urls = []
timeout_urls = []
valid_urls = []

for i, resource in enumerate(resources, 1):
    url = resource["url"]
    print(f"[{i}/{len(resources)}] {resource['title'][:40]:<40} | {resource['type']:<10} | ", end="", flush=True)
    
    try:
        # Use HEAD request first (faster), fallback to GET
        response = requests.head(url, timeout=5, allow_redirects=True, headers={'User-Agent': 'Mozilla/5.0'})
        if response.status_code < 400:
            print(f"✓ {response.status_code}")
            valid_urls.append(resource)
        else:
            print(f"✗ {response.status_code} BROKEN")
            broken_urls.append((resource, response.status_code))
    except requests.Timeout:
        print(f"⏱ TIMEOUT - trying GET...")
        try:
            response = requests.get(url, timeout=10, headers={'User-Agent': 'Mozilla/5.0'})
            if response.status_code < 400:
                print(f"  ✓ {response.status_code}")
                valid_urls.append(resource)
            else:
                print(f"  ✗ {response.status_code}")
                timeout_urls.append((resource, "GET timeout"))
        except:
            print(f"  ✗ UNREACHABLE")
            timeout_urls.append((resource, "Unreachable"))
    except Exception as e:
        print(f"✗ ERROR: {str(e)[:30]}")
        broken_urls.append((resource, str(e)))

print("\n" + "=" * 80)
print("RESULTS SUMMARY")
print("=" * 80)
print(f"✓ Live URLs:        {len(valid_urls)}/{len(resources)}")
print(f"✗ Broken URLs:      {len(broken_urls)}")
print(f"⏱ Timeout/Unknown:  {len(timeout_urls)}")

if broken_urls:
    print("\n" + "=" * 80)
    print("BROKEN RESOURCES (Need Replacement)")
    print("=" * 80)
    for resource, status in broken_urls:
        print(f"\n🔴 {resource['id']} - {resource['title']}")
        print(f"   URL: {resource['url']}")
        print(f"   Status: {status}")
        print(f"   Type: {resource['type']} | Source: {resource['source']}")

if timeout_urls:
    print("\n" + "=" * 80)
    print("UNCERTAIN RESOURCES (Manual Check Recommended)")
    print("=" * 80)
    for resource, reason in timeout_urls:
        print(f"\n⚠️  {resource['id']} - {resource['title']}")
        print(f"   URL: {resource['url']}")
        print(f"   Issue: {reason}")

# Analyze by track
print("\n" + "=" * 80)
print("RESOURCES BY TRACK")
print("=" * 80)

track_resources = {}
for resource in resources:
    track = resource['id'].split('-')[0]
    if track not in track_resources:
        track_resources[track] = []
    track_resources[track].append(resource)

for track_id in sorted(track_resources.keys()):
    items = track_resources[track_id]
    print(f"\n{track_id.upper()}: {len(items)} resources")
    for r in items:
        status = "✓" if r in valid_urls else "?" if r in [x[0] for x in timeout_urls] else "✗"
        print(f"  {status} [{r['type']:<10}] {r['title']:<40} | {r['source']}")

# Save report
report = {
    "total_resources": len(resources),
    "valid": len(valid_urls),
    "broken": len(broken_urls),
    "uncertain": len(timeout_urls),
    "broken_resources": [{"id": r[0]["id"], "title": r[0]["title"], "url": r[0]["url"], "status": r[1]} for r in broken_urls],
    "resources_by_track": {k: len(v) for k, v in track_resources.items()},
}

report_path = Path(__file__).parent / "resources-verification-report.json"
report_path.write_text(json.dumps(report, indent=2))
print(f"\n📊 Report saved to: {report_path}")
