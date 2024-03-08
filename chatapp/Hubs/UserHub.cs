// Hubs/UserHub.cs

using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ChatApp.Hubs
{
    public class UserHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task NotifyUserJoined(string user)
        {
            await Clients.All.SendAsync("UserJoined", user);
        }

        public async Task NotifyUserLeft(string user)
        {
            await Clients.All.SendAsync("UserLeft", user);
        }

        // Add more methods for user-related functionality here
    }
}
