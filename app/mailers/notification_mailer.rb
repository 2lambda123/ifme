# frozen_string_literal: true

class NotificationMailer < ApplicationMailer
  default from: ENV.fetch('SMTP_FROM', nil)

  def take_medication(reminder)
    return if reminder.medication.blank?

    reminder_mailer(reminder.medication, 'medications.reminder_mailer.subject')
  end

  def refill_medication(reminder)
    return if reminder.medication.blank?

    reminder_mailer(reminder.medication, 'medications.refill_mailer.subject')
  end

  def perform_strategy(reminder)
    return if reminder.strategy.blank?

    reminder_mailer(reminder.strategy, 'strategies.reminder_mailer.subject')
  end

  def meeting_reminder(meeting, member)
    @meeting = meeting
    @member = member

    subject = I18n.t(
      'meetings.reminder_mailer.subject',
      meeting_name: @meeting.name,
      time: @meeting.time
    )

    mail(to: @member.email, subject:)
  end

  def notification_email(recipientid, data)
    data = ActiveSupport::HashWithIndifferentAccess.new(JSON.parse(data))
    recipient = User.where(id: recipientid).first

    if can_comment_notify(data, recipient)
      comment_notify(data, recipient)
    elsif can_ally_notify(data, recipient)
      ally_notify(data, recipient)
    elsif can_group_notify(data, recipient)
      group_notify(data, recipient)
    end
  end
end
