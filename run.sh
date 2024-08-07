#!/bin/bash
RED="\e[31m"
CYAN="\e[94m"
STOP="\e[0m"
magenta="\033[1;35m"                                                  
green="\033[1;32m"                                                   
white="\033[1;37m"                                                   
blue="\033[1;34m"                                                    
red="\033[1;31m"                                                      
black="\033[1;40;30m"                                               
yellow="\033[1;33m"                                                 
cyan="\033[1;36m"                                                   
reset="\033[0m"                                                       
bgyellow="\033[1;43;33m"                                               
bgwhite="\033[1;47;37m"
BOLD='\033[1m'
c0=${reset}                                  
c1=${magenta}                                                    
c2=${green}                                                         
c3=${white}                                                    
c4=${blue}                                                       
c5=${red}                                                    
c6=${yellow}                                                       
c7=${cyan}                                                    
c8=${black}                                                     
c9=${bgyellow}                                             
c10=${bgwhite}
neofetch --json > /dev/null                                                              
clear
myip=$(curl -s ifconfig.me)
echo -e ' ─ ─ ──────── ─ ── ── ─────────────── ─ ─'
echo -e " ${c3}Mengecek IP ${c5}$myip ${c3}di database ....${c0}"
echo -e ' ─ ─ ──────── ─ ── ── ─────────────── ─ ─'
url="https://ip.zerocode.pp.ua/list"
nodeversi=$(node -v)
ip_array=$(curl -s "$url")
if [ $? -eq 0 ]; then
    if [[ $ip_array =~ "\"$myip\"" ]]; then                
        if [ ! -e "run.js" ]; then
            wget -q https://raw.githubusercontent.com/NextSekai/startup/main/run.js -O run.js
        fi
        clear
        echo -e ' ─ ─ ──────── ─ ── ── ─────────────── ─ ─'
        echo -e "  IP ${c7}$myip ${c3}Mempunyai Aksess ✓${c0}"
        echo -e ' ─ ─ ──────── ─ ── ── ─────────────── ─ ─'
        clear
        function getDistro() {                                        
  os="$(uname -o) $(uname -m)"                                      
  }                                                                               
                                                                
  function getKernel() {                                    
    kernel="$(uname -r)"                                                 
    }  
arrow=$(echo "»")
output=$(free -g -h -t | sed 's/i/B/g')
total_memory=$(echo "$output" | awk 'NR==2 {print $2}')
used_memory=$(echo "$output" | awk 'NR==2 {print $3}')
available_memory=$(echo "$output" | awk 'NR==2 {print $7}')

json_response=$(curl -s "http://ip-api.com/json/")
ip=$(echo "$json_response" | jq -r '.query')
city=$(echo "$json_response" | jq -r '.city')
region=$(echo "$json_response" | jq -r '.region')
countryc=$(echo "$json_response" | jq -r '.countryCode')
country=$(echo "$json_response" | jq -r '.country')
org=$(echo "$json_response" | jq -r '.isp')
timezone=$(echo "$json_response" | jq -r '.timezone')
today_date=$(date +%d-%m-%Y)
get_uptime=$(uptime | awk -F'( |,|:)+' '{print $6,$7",",$8,"hours,",$9,"minutes."}')
disk_info=$(df -kh . | tail -n1)
DISK_SIZE_TOTAL=$(echo "$disk_info" | awk '{print $2}')
DISK_SIZE_FREE=$(echo "$disk_info" | awk '{print $4}')
DISK_PERCENT_USED=$(echo "$disk_info" | awk '{print $5}')
DISK_PERCENT_USED=${DISK_PERCENT_USED%\%}
DISK_USED_GB=$(echo  "$DISK_SIZE_TOTAL $DISK_PERCENT_USED" | awk '{printf "%.2f", $1 * $2 / 100}' | sed 's/i/B/g')
DISK_FREE_GB=$(echo "$DISK_SIZE_FREE" | sed 's/i/B/g')
cpu_name=$(cat /proc/cpuinfo | grep "model name" | head -1 | cut -d: -f2 | sed 's/^[ \t]*//;s/[ \t]*$//')
cpu_count=$(grep -c '^processor' /proc/cpuinfo)
hosting_name=$(curl -s $url | jq --arg myip "$myip" '.[] | select(.ip == $myip) | .name')


function getTotalPackages() {                        
      package_manager="$(which {apt,dpkg} 2>/dev/null | grep -v "not found" | awk -F/ 'NR==1{print $NF}')"                
      case "${package_manager}" in                                            
         "apt" )                                                                 
            packages=$(apt list --installed 2>/dev/null | wc -l)                 ;;
         "dpkg" )                                                                 
            packages=$(dpkg-query -l | wc -l)                                    ;;
         "" )                                                                     
            packages="Unknown"                                                   ;;
      esac
   }                                   
      function main() {                                  
        getDistro                                        
        getKernel                                        
        getTotalPackages                                                     
     }                   
     
        main                                                                                                                                                    
        echo -e "${yellow}-----------------------------------------" 
        echo -e "${blue}              SERVER INFO                 "                               
        echo -e "${yellow}-----------------------------------------"                                           
        echo -e " ${c1}${arrow} HOST    : ${c3}${BOLD}${hosting_name//\"}"    
        echo -e " ${c2}${arrow} OS      : ${c0}${os}"                                                                 
        echo -e " ${c7}${arrow} DOCKER  : ${c0}25.0 Latest"                                              
        echo -e " ${c5}${arrow} SHELL   : ${c0}ZcodeShell"                                   
        echo -e " ${c6}${arrow} NODE V  : ${c0}${nodeversi}"     
        echo -e " ${c4}${arrow} REGION  : ${c0}${country} (${countryc}) "                                                                     
        echo -e " ${c5}${arrow} ISP     : ${c0}${org}" 
        echo -e " ${c6}${arrow} UPTIME  : ${c0}${get_uptime}" 
        echo -e "${yellow}-----------------------------------------" 
        echo -e "${blue}              SYSTEM INFO                 "                               
        echo -e "${yellow}-----------------------------------------"
        echo -e " ${c1}${arrow} RAM     : ${c0}${available_memory} / ${total_memory}"
        echo -e " ${c6}${arrow} DISK    : ${c0}${DISK_FREE_GB} / ${DISK_SIZE_TOTAL}"
        echo -e " ${c4}${arrow} CPU     : ${c0}${cpu_count} CPU"
        echo -e " ${c7}${arrow} PACKAGE : ${c0}${packages}"
        echo -e " ${c2}${arrow} MODEL   : ${c0}${cpu_name}"
        echo -e " ${c3}${arrow} KERNEL  : ${c0}${kernel}"
        echo -e " ${c5}${arrow} WEBSITE : ${c0}${BOLD}https://bit.ly/zrcdee${c0}"
        echo -e " "
        echo -e "${BOLD} I hope you enjoy all the features of these eggs ${c0}"
        echo -e " ${c1}━━━${c2}━━━${c3}━━━[ ${c7}${BOLD}Powered by Zerocode ${c0}]${c5}━━━${c6}━━━${c7}━━━"
        echo -e " ${green}==========================================="
        echo -e "  ${green}SERVER INI SUDAH TERINSTALL KEBUTUHAN BOT"
        echo -e " ${green}==========================================="
        node run.js
    else
        clear
        echo -e "${c5}— — — — — — — — — — — — — — — — — — — — — — "
        echo -e "${c0}${arrow} IP ${c3}$myip ${c0}Tidak Mempunyai Akses ❌"
        echo -e "${c0}${arrow} Silahkan Daftarkan ip kamu di : ${c2}https://neko.pe/3B2d"
        echo -e "${c5}— — — — — — — — — — — — — — — — — — — — — — "
        echo ""
    fi
else
    echo "Failed get IP list"
fi
                                                                                                                                                                                                
                                                                                                                                                                                                
