using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChatApp.Models;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly ChatApp_DBContext _dbContext;

    public ChatController(ChatApp_DBContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("users")]
    public ActionResult<IEnumerable<User>> GetUsers()
    {
        var users = _dbContext.Users.ToList();
        return Ok(users);
    }

    [HttpPost("users")]
    public ActionResult<User> CreateUser([FromBody] User user)
    {
        if (user == null)
        {
            return BadRequest("User data is null");
        }

        // Additional validation if needed

        _dbContext.Users.Add(user);
        _dbContext.SaveChanges();

        return CreatedAtAction(nameof(GetUsers), new { id = user.UserId }, user);
    }

    [HttpGet("messages")]
    public ActionResult<IEnumerable<Message>> GetMessages()
    {
        var messages = _dbContext.Messages.Include(m => m.Sender).Include(m => m.Recipient).ToList();
        return Ok(messages);
    }

    [HttpPost("send")]
    public ActionResult<Message> SendMessage([FromBody] Message message)
    {
        if (message == null)
        {
            return BadRequest("Message data is null");
        }

        // Additional validation if needed

        _dbContext.Messages.Add(message);
        _dbContext.SaveChanges();

        return Ok(message);
    }
}
