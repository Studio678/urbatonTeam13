﻿using System;
using System.Linq;
using Gamefication.DTO;
using Gamefication.Storages;
using JetBrains.Annotations;

namespace Gamefication
{
    internal class EventFeed
    {
        private readonly IEventReader eventReader;

        private readonly IEventReaderPointerStorage eventReaderPointerStorage;

        public EventFeed(IEventReaderPointerStorage eventReaderPointerStorage, IEventReader eventReader)
        {
            this.eventReaderPointerStorage = eventReaderPointerStorage;
            this.eventReader = eventReader;
        }

        public void ConsumeNextEventBatch([NotNull] Action<Event[]> processEventsAction)
        {
            var lastProcessedEventId = eventReaderPointerStorage.TryGetLastProcessedEventId();
            var newEvents = eventReader.GetEvents(lastProcessedEventId);

            if (!newEvents.Any())
                return;

            processEventsAction(newEvents);
            eventReaderPointerStorage.UpdateLastProcessedEventId(newEvents.Last().EventId);
        }
    }
}