<#
PowerShell script to hit an endpoint repeatedly and count status codes.
Usage example in PowerShell (replace URL):
  .\scripts\pwsh-rate-test.ps1 -Url "https://your-deployment.vercel.app/api/rate-test" -Count 200 -DelayMs 100
#>

param(
  [string]$Url = "https://your-deployment.vercel.app/api/rate-test",
  [int]$Count = 200,
  [int]$DelayMs = 100
)

$success = 0
$rate = 0
$other = 0

for ($i = 1; $i -le $Count; $i++) {
  try {
    $r = Invoke-WebRequest -Uri $Url -Method Get -UseBasicParsing -ErrorAction Stop
    $status = $r.StatusCode
    if ($status -eq 200) { $success++ } else { $other++ }
    Write-Host "$i -> $status"
  } catch {
    $resp = $_.Exception.Response
    if ($resp) {
      # Use Value__ to get underlying numeric code
      $status = $resp.StatusCode.Value__
      if ($status -eq 429) { $rate++ } else { $other++ }
      Write-Host "$i -> ERROR status $status"
    } else {
      Write-Host "$i -> REQUEST ERROR: $($_.Exception.Message)"
      $other++
    }
  }
  Start-Sleep -Milliseconds $DelayMs
}

Write-Host "Done. 200=$success 429=$rate other=$other"
